import { ActionContext } from '@/core/action/types';
import joinStrings from '@/extensions/fetch-json-api/utilities/joinStrings';

export default function makeEndpoint(baseURL: string, context: ActionContext) {
  return joinStrings([
    baseURL,
    context.type,
    context.id,
    context.relation,
    context.path,
  ], '/');
}
