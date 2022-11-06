import type { ModelProp } from '@/core';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/makeSerializer';
import useTransformIfSet from '@/json-api/useTransformIfSet';

export default function useKey(
  def: ModelProp<unknown, unknown>,
  key: string,
  options: JsonApiSerializerOptions,
) {
  if (def.alias !== undefined) {
    return def.alias;
  }

  return useTransformIfSet(key, options.transformKeys);
}
