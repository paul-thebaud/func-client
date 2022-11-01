import deserializeOne from '@/extensions/fetch-json-api/deserialization/deserializeOne';
import { JsonApiIncludedMap } from '@/extensions/fetch-json-api/deserialization/makeIncludedMap';
import { DeserializeOptions } from '@/extensions/fetch-json-api/deserialization/types';
import { JsonApiRecord } from '@/extensions/fetch-json-api/types';

export default async function deserializeMany(
  records: JsonApiRecord[],
  included: JsonApiIncludedMap,
  options: DeserializeOptions,
) {
  return Promise.all(records.map(
    (record) => deserializeOne(record, included, options),
  ));
}
