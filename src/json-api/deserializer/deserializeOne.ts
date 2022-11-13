import { ActionContext, FuncModelError, ModelInstance, syncOriginal } from '@/core';
import isInstance from '@/core/model/guards/isInstance';
import deserializeAttribute from '@/json-api/deserializer/deserializeAttribute';
import deserializeRelation from '@/json-api/deserializer/deserializeRelation';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import findOrMakeInstance from '@/json-api/deserializer/findOrMakeInstance';
import type { DeserializerOptions } from '@/json-api/deserializer/types';
import { NewJsonApiResource } from '@/json-api/types';
import serializedKey from '@/json-api/utilities/serializedKey';

export type DeserializeOne = (
  context: ActionContext,
  data: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
  options: DeserializerOptions,
) => Promise<ModelInstance>;

export default async function deserializeOne(
  context: ActionContext,
  resource: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
  options: DeserializerOptions,
): Promise<ModelInstance> {
  const instance = await findOrMakeInstance(context, resource, includedMap);

  await Promise.all(Object.entries(instance.constructor.$schema).map(async ([key, def]) => {
    const resourceKey = serializedKey(def, key, options);

    if (def.$MODEL_TYPE === 'attribute') {
      Object.assign(instance.$values, await deserializeAttribute(
        def,
        key,
        resource.attributes?.[resourceKey],
      ));
    } else if (def.$MODEL_TYPE === 'relation') {
      Object.assign(instance.$values, await deserializeRelation(
        key,
        resource.relationships?.[resourceKey],
        async (resourceIdentifier) => {
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
        },
      ));
    }
  }));

  syncOriginal(instance);

  return instance;
}
