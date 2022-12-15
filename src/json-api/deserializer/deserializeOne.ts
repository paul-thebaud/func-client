import { ActionContext, FuncModelError, ModelInstance, runHook, syncOriginal } from '@/core';
import isAttributeDef from '@/core/model/guards/isAttributeDef';
import isRelationDef from '@/core/model/guards/isRelationDef';
import deserializeAttribute from '@/json-api/deserializer/deserializeAttribute';
import deserializeRelation from '@/json-api/deserializer/deserializeRelation';
import findOrMakeInstance from '@/json-api/deserializer/findOrMakeInstance';
import { JsonApiDeserializationData } from '@/json-api/deserializer/prepareDeserializationData';
import type { DeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiResourceIdentifier, NewJsonApiResource } from '@/json-api/types';
import serializedKey from '@/json-api/utilities/serializedKey';

/**
 * This ID is used for ID-less resource, which will occurs only when creating
 * resource. We can use a static value because an ID-less resource will always
 * be unique by payload.
 */
export const NON_IDENTIFIED_INSTANCE_ID = '__non-identified-instance__';

export default async function deserializeOne(
  context: ActionContext,
  resource: NewJsonApiResource,
  deserializationData: JsonApiDeserializationData,
  options: DeserializerOptions,
): Promise<ModelInstance> {
  const deserializeRelated = async (resourceIdentifier: JsonApiResourceIdentifier) => {
    const resourceData = deserializationData.resources
      .get(resourceIdentifier.type)
      ?.get(resourceIdentifier.id);
    if (resourceData) {
      return deserializeOne(context, resourceData, deserializationData, options);
    }

    throw new FuncModelError(
      `Cannot deserialize related resource \`${resourceIdentifier.type}\` with id \`${resourceIdentifier.id}\`. It does not exists in fetched resources.`,
    );
  };

  let instancesMapOfType = deserializationData.instances.get(resource.type);
  if (!instancesMapOfType) {
    deserializationData.instances.set(resource.type, instancesMapOfType = new Map());
  }

  let instancePromise = instancesMapOfType.get(
    resource.id ?? NON_IDENTIFIED_INSTANCE_ID,
  );
  if (instancePromise) {
    return instancePromise;
  }

  instancesMapOfType.set(
    resource.id ?? NON_IDENTIFIED_INSTANCE_ID,
    instancePromise = findOrMakeInstance(context, resource),
  );

  const instance = await instancePromise;

  await Promise.all(Object.entries(instance.constructor.$schema).map(async ([key, def]) => {
    const resourceKey = serializedKey(def, key, options);

    if (isAttributeDef(def)) {
      const value = resource.attributes?.[resourceKey];
      if (value !== undefined) {
        Object.assign(
          instance.$values,
          await deserializeAttribute(def, key, value),
        );

        instance.$loaded[key] = true;
      }
    } else if (isRelationDef(def)) {
      const value = resource.relationships?.[resourceKey];
      if (value !== undefined) {
        Object.assign(
          instance.$values,
          await deserializeRelation(key, value, deserializeRelated),
        );

        instance.$loaded[key] = true;
      }
    } else {
      throw new FuncModelError(`Cannot deserialize non attribute or relation key \`${key}\``);
    }
  }));

  instance.exists = true;

  syncOriginal(instance);

  await runHook(instance.constructor, 'retrieved', instance);

  return instance;
}
