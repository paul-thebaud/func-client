import { ActionContext } from '@/core/action/types';
import makeEndpoint from '@/fetch-json-api/requests/makeEndpoint';
import makeParams from '@/fetch-json-api/requests/makeParams';
import joinStrings from '@/fetch-json-api/utilities/joinStrings';

export default function makeURL(baseURL: string, context: ActionContext) {
  return joinStrings([
    makeEndpoint(baseURL, context),
    makeParams(context),
  ], '?');
}
