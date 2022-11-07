import { ActionContext, runHook } from '@/core';
import makeRequest from '@/json-api/adapter/requests/makeRequest';
import parseResponse from '@/json-api/adapter/requests/parseResponse';
import runRequest from '@/json-api/adapter/requests/runRequest';
import throwResponseError from '@/json-api/adapter/requests/throwResponseError';
import { JsonApiAdapterOptions, JsonApiResponse } from '@/json-api/adapter/types';

export default function makeFetchAdapter(options: JsonApiAdapterOptions = {}) {
  return {
    async action(context: ActionContext): Promise<JsonApiResponse> {
      // TODO Transformers?
      const request = runHook(
        context,
        'json-api.transform-request',
        makeRequest(context, options),
      );

      const response = runHook(
        context,
        'json-api.transform-response',
        await runRequest(request, options),
      );

      const document = await parseResponse(response);
      if (response.ok) {
        return { response, document };
      }

      // TODO Document inside errors to provide access to meta?
      return throwResponseError(response, document?.errors ?? []);
    },
    async data(result: JsonApiResponse) {
      return result.document;
    },
  };
}
