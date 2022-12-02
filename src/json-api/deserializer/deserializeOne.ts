import { ActionContext, FuncModelError, isInstance, ModelInstance, syncOriginal } from '@/core';
import isAttributeDef from '@/core/model/guards/isAttributeDef';
import isRelationDef from '@/core/model/guards/isRelationDef';
import runInstanceHooks from '@/core/model/hooks/runInstanceHooks';
import deserializeAttribute from '@/json-api/deserializer/deserializeAttribute';
import deserializeRelation from '@/json-api/deserializer/deserializeRelation';
import findOrMakeInstance from '@/json-api/deserializer/findOrMakeInstance';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import type { DeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiResourceIdentifier, NewJsonApiResource } from '@/json-api/types';
import serializedKey from '@/json-api/utilities/serializedKey';

export default async function deserializeOne(
  context: ActionContext,
  resource: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
  options: DeserializerOptions,
): Promise<ModelInstance> {
  const deserializeIncluded = async (resourceIdentifier: JsonApiResourceIdentifier) => {
    const includedMapOfType = includedMap.get(resourceIdentifier.type);
    const includedData = includedMapOfType?.get(resourceIdentifier.id);
    if (includedData) {
      if (isInstance(includedData)) {
        return includedData;
      }

      return deserializeOne(context, includedData, includedMap, options);
    }

    throw new FuncModelError(
      `Cannot deserialize related resource \`${resourceIdentifier.type}\` with id \`${resourceIdentifier.id}\`. It does not exists in included resources.`,
    );
  };

  const instance = await findOrMakeInstance(context, resource, includedMap);

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
          await deserializeRelation(key, value, deserializeIncluded),
        );

        instance.$loaded[key] = true;
      }
    } else {
      throw new FuncModelError(`Cannot deserialize non attribute or relation key \`${key}\``);
    }
  }));

  instance.exists = true;

  syncOriginal(instance);
  runInstanceHooks(instance, 'onRetrieved');

  return instance;
}
