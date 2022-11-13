import { ModelInstance } from '@/core';
import deserializeRelated from '@/json-api/deserializer/deserializeRelated';
import { JsonApiRelationship, JsonApiResourceIdentifier } from '@/json-api/types';

export type DeserializeIncluded = (
  resourceIdentifier: JsonApiResourceIdentifier,
) => Promise<ModelInstance>;

export default async function deserializeRelation(
  key: string,
  value: JsonApiRelationship | undefined,
  deserializeIncluded: DeserializeIncluded,
) {
  if (value === undefined || value.data === undefined) {
    return {};
  }

  return {
    [key]: await deserializeRelated(value.data, deserializeIncluded),
  };
}
