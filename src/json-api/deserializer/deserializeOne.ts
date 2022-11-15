import { ActionContext, FuncModelError, ModelInstance, syncOriginal } from '@/core';
import isAttributeDef from '@/core/model/guards/isAttributeDef';
import isInstance from '@/core/model/guards/isInstance';
import isRelationDef from '@/core/model/guards/isRelationDef';
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
      Object.assign(instance.$values, await deserializeAttribute(
        def,
        key,
        resource.attributes?.[resourceKey],
      ));
    } else if (isRelationDef(def)) {
      Object.assign(instance.$values, await deserializeRelation(
        key,
        resource.relationships?.[resourceKey],
        deserializeIncluded,
      ));
    } else {
      throw new FuncModelError(`Cannot deserialize non attribute or relation key \`${key}\``);
    }
  }));

  syncOriginal(instance);

  return instance;
}
