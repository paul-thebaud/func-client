import { ActionContext, useHook } from '@/core';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';
import makeRequest from '@/json-api/adapter/requests/makeRequest';
import parseResponse from '@/json-api/adapter/requests/parseResponse';
import runRequest from '@/json-api/adapter/requests/runRequest';
import throwResponseError from '@/json-api/adapter/requests/throwResponseError';
import { JsonApiAdapterOptions, JsonApiResponse } from '@/json-api/adapter/types';

export default function makeFetchAdapter(options: JsonApiAdapterOptions = {}) {
  return {
    async action(context: ActionContext): Promise<JsonApiResponse> {
      // TODO Transformers?
      const request = useHook(
        context,
        'json-api.transform-request',
        makeRequest(context, options),
      );

      const response = useHook(
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
    isNotFound(error: unknown) {
      return error instanceof NotFoundError;
    },
  };
}
