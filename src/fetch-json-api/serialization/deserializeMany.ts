import type { WithStoreContext } from '@/core/action/changers/useStore';
import type { ActionContext } from '@/core/action/types';
import type { Store } from '@/core/store/types';
import deserializeOne from '@/fetch-json-api/serialization/deserializeOne';
import { JsonApiIncludedMap } from '@/fetch-json-api/serialization/makeIncludedMap';
import { JsonApiRecord } from '@/fetch-json-api/types';

export default async function deserializeMany(
  context: WithStoreContext<ActionContext, Store>,
  records: JsonApiRecord[],
  included: JsonApiIncludedMap,
) {
  return Promise.all(records.map(
    (record) => deserializeOne(context, record, included),
  ));
}
