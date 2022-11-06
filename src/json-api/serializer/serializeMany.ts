import { ModelInstance } from '@/core';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/types';
import serializeOne from '@/json-api/serializer/serializeOne';

// TODO Options (key case).
export default async function serializeMany(
  models: ModelInstance[],
  options: JsonApiSerializerOptions,
) {
  return Promise.all(models.map((m) => serializeOne(m, options)));
}
