import { ModelInstance } from '@/core/model/types';
import { JsonApiRecord, JsonApiRecordId } from '@/extensions/fetch-json-api/types';
import getOrSetMap from '@/extensions/fetch-json-api/utilities/getOrSetMap';

export type JsonApiIncludedOfTypeMap = Map<JsonApiRecordId, ModelInstance | JsonApiRecord>;
export type JsonApiIncludedMap = Map<string, JsonApiIncludedOfTypeMap>;

export default function makeIncludedMap(included: JsonApiRecord[]) {
  const includedMap: JsonApiIncludedMap = new Map();

  included.forEach((record) => {
    getOrSetMap(includedMap, record.type, new Map()).set(record.id, record);
  });

  return includedMap;
}