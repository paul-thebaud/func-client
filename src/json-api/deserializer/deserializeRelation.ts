import deserializeOneOrManyRelated, { DeserializeRelated } from '@/json-api/deserializer/deserializeOneOrManyRelated';
import { JsonApiRelationship } from '@/json-api/types';

export default async function deserializeRelation(
  key: string,
  value: JsonApiRelationship | undefined,
  deserializeRelated: DeserializeRelated,
) {
  if (value === undefined || value.data === undefined) {
    return {};
  }

  return {
    [key]: await deserializeOneOrManyRelated(value.data, deserializeRelated),
  };
}
