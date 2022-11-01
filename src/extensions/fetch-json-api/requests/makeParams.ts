import { ActionContext } from '@/core/action/types';
import serializeParams from '@/extensions/fetch-json-api/requests/utilities/serializeParams';

export default function makeParams(context: ActionContext) {
  return serializeParams(context.params || {});
}
