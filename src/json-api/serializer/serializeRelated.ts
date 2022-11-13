import { ModelInstance } from '@/core';
import isNil from '@/core/utilities/isNil';
import serializeRef from '@/json-api/serializer/serializeRef';

export default async function serializeRelated(
  value: ModelInstance[] | ModelInstance | null,
) {
  if (isNil(value)) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.map((i) => serializeRef(i));
  }

  return serializeRef(value);
}
