import { ActionContext } from '@/core';
import serializeParams from '@/fetch-json-api/requests/utilities/serializeParams';

export default function makeParams(context: ActionContext) {
  return serializeParams(context.params || {});
}
