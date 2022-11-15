import { ActionContext } from '@/core';
import paramsSerializer from '@/json-api/adapter/requests/paramsSerializer';
import { FetchAdapterOptions } from '@/json-api/adapter/types';

export default function makeParams(context: ActionContext, options: FetchAdapterOptions) {
  const serializeParams = options.paramsSerializer ?? paramsSerializer;

  return serializeParams(context.params);
}
