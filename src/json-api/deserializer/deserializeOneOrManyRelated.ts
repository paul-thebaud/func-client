import { ModelInstance } from '@/core';
import isNil from '@/core/utilities/isNil';
import { JsonApiResourceIdentifier } from '@/json-api/types';

export type DeserializeRelated = (
  resourceIdentifier: JsonApiResourceIdentifier,
) => Promise<ModelInstance>;

export default async function deserializeOneOrManyRelated(
  value: JsonApiResourceIdentifier[] | JsonApiResourceIdentifier | null,
  deserializeRelated: DeserializeRelated,
) {
  if (isNil(value)) {
    return null;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((r) => deserializeRelated(r)));
  }

  return deserializeRelated(value);
}
