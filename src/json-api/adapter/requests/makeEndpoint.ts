import { ActionContext } from '@/core';
import isNil from '@/core/utilities/isNil';
import { FetchAdapterOptions } from '@/json-api/adapter/types';

export default function makeEndpoint(context: ActionContext, options: FetchAdapterOptions) {
  return [
    isNil(context.baseURL)
      ? (options.baseURL || '/api')
      : context.baseURL,
    isNil(context.type)
      ? undefined
      : context.type,
    isNil(context.id)
      ? undefined
      : `${context.id}`,
    isNil(context.relation)
      ? undefined
      : context.type,
    context.path,
  ];
}
