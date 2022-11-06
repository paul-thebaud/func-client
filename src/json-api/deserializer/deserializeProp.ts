import { ModelProp, useTransform } from '@/core';
import type { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiAttributes, JsonApiRelationships } from '@/json-api/types';
import useKey from '@/json-api/useKey';

export default async function deserializeProp(
  def: ModelProp<unknown, unknown>,
  key: string,
  data: JsonApiAttributes | JsonApiRelationships,
  options: JsonApiDeserializerOptions,
) {
  const dataKey = useKey(def, key, options);
  if (dataKey in data) {
    const transform = useTransform(def.transformer, 'deserialize');

    return transform(data[dataKey]);
  }

  return undefined;
}
