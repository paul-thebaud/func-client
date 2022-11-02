import { ActionContext } from '@/core/action/types';
import makeEndpoint from '@/plugins/fetch-json-api/requests/makeEndpoint';
import makeParams from '@/plugins/fetch-json-api/requests/makeParams';
import joinStrings from '@/plugins/fetch-json-api/utilities/joinStrings';

export default function makeURL(baseURL: string, context: ActionContext) {
  return joinStrings([
    makeEndpoint(baseURL, context),
    makeParams(context),
  ], '?');
}
