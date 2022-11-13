import { ActionContext } from '@/core';
import makeRequestInit from '@/json-api/adapter/requests/makeRequestInit';
import makeURL from '@/json-api/adapter/requests/makeURL';
import { FetchAdapterOptions, JsonApiRequest } from '@/json-api/adapter/types';

export default function makeRequest(
  context: ActionContext,
  options: FetchAdapterOptions,
): JsonApiRequest {
  return {
    url: makeURL(context, options),
    init: makeRequestInit(context),
  };
}
