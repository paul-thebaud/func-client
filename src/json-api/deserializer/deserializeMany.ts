import { ActionContext } from '@/core';
import deserializeOne from '@/json-api/deserializer/deserializeOne';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import type { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiResource } from '@/json-api/types';

export default async function deserializeMany(
  context: ActionContext,
  data: JsonApiResource[],
  includedMap: JsonApiIncludedMap,
  options: JsonApiDeserializerOptions,
) {
  return Promise.all(data.map((r) => deserializeOne(context, r, includedMap, options)));
}
