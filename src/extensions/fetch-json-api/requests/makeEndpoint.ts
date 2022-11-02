import { ActionContext } from '@/core/action/types';
import isNil from '@/core/utilities/isNil';
import joinStrings from '@/extensions/fetch-json-api/utilities/joinStrings';

export default function makeEndpoint(baseURL: string, context: ActionContext) {
  return joinStrings([
    baseURL,
    context.type,
    isNil(context.id) ? undefined : `${context.id}`,
    context.relation,
    context.path,
  ], '/');
}