import { ActionContext, useHook } from '@/core';
import isNil from '@/core/utilities/isNil';
import { JsonApiAdapterOptions } from '@/json-api/adapter/types';

export default function makeEndpoint(context: ActionContext, options: JsonApiAdapterOptions) {
  return [
    isNil(context.baseURL)
      ? (options.baseURL || '/api')
      : context.baseURL,
    isNil(context.type)
      ? undefined
      : useHook(context, 'json-api.transform-request.type', context.type),
    isNil(context.id)
      ? undefined
      : `${context.id}`,
    isNil(context.relation)
      ? undefined
      : useHook(context, 'json-api.transform-request.relation', context.type),
    context.path,
  ];
}
