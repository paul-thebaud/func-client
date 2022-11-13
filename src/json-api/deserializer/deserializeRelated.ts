import { ModelInstance } from '@/core';
import isNil from '@/core/utilities/isNil';
import { JsonApiResourceIdentifier } from '@/json-api/types';

export type DeserializeIncluded = (
  resourceIdentifier: JsonApiResourceIdentifier,
) => Promise<ModelInstance>;

export default async function deserializeRelated(
  value: JsonApiResourceIdentifier[] | JsonApiResourceIdentifier | null,
  deserializeIncluded: DeserializeIncluded,
) {
  if (isNil(value)) {
    return null;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((r) => deserializeIncluded(r)));
  }

  return deserializeIncluded(value);
}
