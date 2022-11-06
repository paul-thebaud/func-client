import { ModelInstance, ModelRelation } from '@/core';
import serializeProp from '@/json-api/serializer/serializeProp';
import serializeRef from '@/json-api/serializer/serializeRef';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/types';

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

  // TODO Data object made here, bad idea?
  return serializeProp(def, key, { data: refValue }, options);
}
