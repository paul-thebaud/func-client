import { ActionContext } from '@/core/action/types';
import serializeParams from '@/plugins/fetch-json-api/requests/utilities/serializeParams';

export default function makeParams(context: ActionContext) {
  return serializeParams(context.params || {});
}
