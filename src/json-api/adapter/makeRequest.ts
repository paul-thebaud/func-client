import { ActionContext, Dictionary } from '@/core';
import makeEndpoint from '@/json-api/adapter/makeEndpoint';
import { AdapterOptions, JsonApiRequest } from '@/json-api/adapter/types';

export default function makeRequest<R>(
  context: ActionContext,
  options: AdapterOptions<R>,
): JsonApiRequest {
  return {
    endpoint: makeEndpoint(context, options),
    method: context.method,
    params: context.params,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      ...(context.headers ?? {}),
    } as Dictionary<string> | undefined,
    payload: context.payload,
  };
}
