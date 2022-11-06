import { ActionContext, Dictionary } from '@/core';
import { JsonApiAdapterOptions } from '@/json-api/adapter/types';

export default function makeRequestInit(
  context: ActionContext,
  options: JsonApiAdapterOptions,
) {
  const method = (context?.method ?? 'GET').toUpperCase();
  const headers: Dictionary = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
    ...(options.headers ?? {}),
    ...(context.headers ?? {}),
  };

  const jsonContentTypes = ['application/json', 'application/vnd.api+json'] as unknown[];
  let payload = undefined as unknown;
  if (context.payload !== undefined) {
    if (jsonContentTypes.indexOf(headers['Content-Type'])
      || jsonContentTypes.indexOf(headers['content-type'])
    ) {
      payload = JSON.stringify(context.payload);
    } else {
      payload = context.payload;
    }
  }

  return {
    method,
    headers: headers as HeadersInit,
    body: payload as BodyInit,
  };
}
