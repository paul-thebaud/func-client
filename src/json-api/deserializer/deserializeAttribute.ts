import { ModelAttribute } from '@/core';
import deserializeProp from '@/json-api/deserializer/deserializeProp';
import type { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiAttributes } from '@/json-api/types';

export default async function deserializeAttribute(
  def: ModelAttribute<unknown, unknown>,
  key: string,
  data: JsonApiAttributes,
  options: JsonApiDeserializerOptions,
) {
  return deserializeProp(def, key, data, options);
}
