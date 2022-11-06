import { ModelProp, useTransform } from '@/core';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/types';
import useKey from '@/json-api/useKey';

export default async function serializeProp(
  def: ModelProp<unknown, unknown>,
  key: string,
  value: unknown,
  options: JsonApiSerializerOptions,
) {
  const transform = useTransform(def.transformer, 'serialize');

  return {
    [useKey(def, key, options)]: await transform(value),
  };
}
