import { ActionContext } from '@/core';
import makeRequestInit from '@/json-api/adapter/requests/makeRequestInit';
import makeURL from '@/json-api/adapter/requests/makeURL';
import { JsonApiAdapterOptions, JsonApiRequestContext } from '@/json-api/adapter/types';

export default function makeRequest(
  context: ActionContext,
  options: JsonApiAdapterOptions,
): JsonApiRequestContext {
  const request = {
    url: makeURL(context, options),
    init: makeRequestInit(context, options),
  };
  if (options.transformRequest) {
    return options.transformRequest(request);
  }

  return request;
}
