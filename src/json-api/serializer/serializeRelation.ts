import { ModelInstance, ModelRelation } from '@/core';
import serializedKey from '@/json-api/utilities/serializedKey';
import serializeRef from '@/json-api/serializer/serializeRef';
import type { SerializerOptions } from '@/json-api/serializer/types';

export default async function serializeRelation(
  def: ModelRelation<unknown, unknown>,
  key: string,
  value: unknown,
  options: SerializerOptions,
) {
  let refValue = null;
  if (Array.isArray(value)) {
    refValue = value.map((model) => serializeRef(model));
  } else if (value) {
    refValue = serializeRef(value as ModelInstance);
  }

  return {
    [serializedKey(def, key, options)]: refValue,
  };
}