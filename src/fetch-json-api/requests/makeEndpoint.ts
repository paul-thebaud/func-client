import { ActionContext } from '@/core';
import isNil from '@/core/utilities/isNil';
import joinStrings from '@/fetch-json-api/utilities/joinStrings';

export default function makeEndpoint(baseURL: string, context: ActionContext) {
  return joinStrings([
    isNil(context.baseURL) ? baseURL : context.baseURL,
    context.type,
    isNil(context.id) ? undefined : `${context.id}`,
    context.relation,
    context.path,
  ], '/');
}
