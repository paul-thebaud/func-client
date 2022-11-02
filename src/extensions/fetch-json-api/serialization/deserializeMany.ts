import { ActionContext, Store } from '@/core';
import { WithStoreContext } from '@/core/action/changers/useStore';
import deserializeOne from '@/extensions/fetch-json-api/serialization/deserializeOne';
import { JsonApiIncludedMap } from '@/extensions/fetch-json-api/serialization/makeIncludedMap';
import { JsonApiRecord } from '@/extensions/fetch-json-api/types';

export default async function deserializeMany(
  context: WithStoreContext<ActionContext, Store>,
  records: JsonApiRecord[],
  included: JsonApiIncludedMap,
) {
  return Promise.all(records.map(
    (record) => deserializeOne(context, record, included),
  ));
}
