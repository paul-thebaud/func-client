import { ModelAttribute, useTransform } from '@/core';
import serializedKey from '@/json-api/utilities/serializedKey';
import type { SerializerOptions } from '@/json-api/serializer/types';

export default async function serializeAttribute(
  def: ModelAttribute,
  key: string,
  value: unknown,
  options: SerializerOptions,
) {
  const transform = useTransform(def.transformer, 'serialize');

  return {
    [await serializedKey(def, key, options)]: await transform(value),
  };
}
