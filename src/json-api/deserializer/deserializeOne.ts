import { ActionContext, ModelInstance } from '@/core';
import syncOriginal from '@/core/model/utilities/syncOriginal';
import deserializeAttribute from '@/json-api/deserializer/deserializeAttribute';
import deserializeRelation from '@/json-api/deserializer/deserializeRelation';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import makeOrFindInstance from '@/json-api/deserializer/makeOrFindInstance';
import type { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { NewJsonApiResource } from '@/json-api/types';

export type DeserializeOne = (
  context: ActionContext,
  data: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
  options: JsonApiDeserializerOptions,
) => Promise<ModelInstance>;

export default async function deserializeOne(
  context: ActionContext,
  data: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
  options: JsonApiDeserializerOptions,
): Promise<ModelInstance> {
  const instance = await makeOrFindInstance(context, data, includedMap);

  await Promise.all(Object.entries(instance.constructor.$schema).map(async ([key, def]) => {
    if (def.$MODEL_TYPE === 'attribute') {
      Object.assign(instance.$values, await deserializeAttribute(
        def,
        key,
        data.attributes ?? {},
        options,
      ));
    } else if (def.$MODEL_TYPE === 'relation') {
      Object.assign(instance.$values, await deserializeRelation(
        context,
        def,
        key,
        data.relationships ?? {},
        includedMap,
        options,
        deserializeOne,
      ));
    }
  }));

  syncOriginal(instance);

  return instance;
}
