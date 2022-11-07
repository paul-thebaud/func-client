import { ActionContext } from '@/core';
import makeRequestInit from '@/json-api/adapter/requests/makeRequestInit';
import makeURL from '@/json-api/adapter/requests/makeURL';
import { JsonApiAdapterOptions, JsonApiRequestContext } from '@/json-api/adapter/types';

export default function makeRequest(
  context: ActionContext,
  options: JsonApiAdapterOptions,
): JsonApiRequestContext {
  return {
    url: makeURL(context, options),
    init: makeRequestInit(context, options),
  };
}
