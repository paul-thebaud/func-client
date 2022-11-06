import { ActionContext } from '@/core';
import makeRequest from '@/json-api/adapter/requests/makeRequest';
import parseResponse from '@/json-api/adapter/requests/parseResponse';
import runRequest from '@/json-api/adapter/requests/runRequest';
import throwResponseError from '@/json-api/adapter/requests/throwResponseError';
import { JsonApiAdapterOptions } from '@/json-api/adapter/types';

export default function makeFetchAdapter(options: JsonApiAdapterOptions = {}) {
  return {
    async action(context: ActionContext) {
      // TODO Transformers?
      const request = makeRequest(context, options);
      const response = await runRequest(request, options);
      const document = await parseResponse(response);
      if (response.ok) {
        return response;
      }

      return throwResponseError(response, document?.errors ?? []);
    },
    async data(result: Response) {
      return parseResponse(result);
    },
  };
}
