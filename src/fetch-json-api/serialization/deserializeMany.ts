import { WithStoreContext } from '@/core';
import deserializeOne from '@/fetch-json-api/serialization/deserializeOne';
import { JsonApiIncludedMap } from '@/fetch-json-api/serialization/makeIncludedMap';
import { JsonApiRecord } from '@/fetch-json-api/types';

export default async function deserializeMany(
  context: WithStoreContext,
  records: JsonApiRecord[],
  included: JsonApiIncludedMap,
) {
  return Promise.all(records.map(
    (record) => deserializeOne(context, record, included),
  ));
}
