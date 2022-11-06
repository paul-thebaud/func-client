import { ModelInstance } from '@/core';
import { JsonApiResource, JsonApiResourceId } from '@/json-api/types';

export type JsonApiIncludedOfTypeMap = Map<JsonApiResourceId, ModelInstance | JsonApiResource>;
export type JsonApiIncludedMap = Map<string, JsonApiIncludedOfTypeMap>;

export default function makeIncludedMap(included: JsonApiResource[]) {
  const includedMap: JsonApiIncludedMap = new Map();

  included.forEach((record) => {
    let includedMapOfType = includedMap.get(record.type);
    if (!includedMapOfType) {
      includedMapOfType = new Map();

      includedMap.set(record.type, includedMapOfType);
    }

    includedMapOfType.set(record.id, record);
  });

  return includedMap;
}
