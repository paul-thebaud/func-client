import { ModelAttribute } from '@/core';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/types';
import serializeProp from '@/json-api/serializer/serializeProp';

export default async function serializeAttribute(
  def: ModelAttribute<unknown, unknown>,
  key: string,
  value: unknown,
  options: JsonApiSerializerOptions,
) {
  return serializeProp(def, key, value, options);
}
