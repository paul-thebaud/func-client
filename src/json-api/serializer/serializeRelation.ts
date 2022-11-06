import { ModelInstance, ModelRelation } from '@/core';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/types';
import serializeProp from '@/json-api/serializer/serializeProp';
import serializeRef from '@/json-api/serializer/serializeRef';

export default async function serializeRelation(
  def: ModelRelation<unknown, unknown>,
  key: string,
  value: unknown,
  options: JsonApiSerializerOptions,
) {
  let refValue = null;
  if (Array.isArray(value)) {
    refValue = value.map((model) => serializeRef(model));
  } else if (value) {
    refValue = serializeRef(value as ModelInstance);
  }

  return serializeProp(def, key, { data: refValue }, options);
}
