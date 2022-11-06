import { ActionContext } from '@/core';
import isNil from '@/core/utilities/isNil';
import { JsonApiAdapterOptions } from '@/json-api/adapter/types';
import useTransformIfSet from '@/json-api/useTransformIfSet';

export default function makeEndpoint(context: ActionContext, options: JsonApiAdapterOptions) {
  return [
    isNil(context.baseURL)
      ? (options.baseURL || '/api')
      : context.baseURL,
    isNil(context.type)
      ? undefined
      : useTransformIfSet(context.type, options.transformTypes),
    isNil(context.id)
      ? undefined
      : `${context.id}`,
    isNil(context.relation)
      ? undefined
      : useTransformIfSet(context.relation, options.transformRelations),
    context.path,
  ];
}
