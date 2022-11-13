import { AdapterI, runAffectingHooks, useHooks } from '@/core';
import { ActionContext } from '@/core/actions/types';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';
import makeRequest from '@/json-api/adapter/requests/makeRequest';
import makeResponseError from '@/json-api/adapter/requests/makeResponseError';
import parseResponse from '@/json-api/adapter/requests/parseResponse';
import runRequest from '@/json-api/adapter/requests/runRequest';
import {
  FetchAdapterOptions,
  JsonApiResponse,
  TransformErrorHook,
  TransformRequestHook,
  TransformResponseHook,
} from '@/json-api/adapter/types';
import { JsonApiDocument } from '@/json-api/types';

export default class FetchAdapter implements AdapterI<JsonApiResponse, JsonApiDocument> {
  private options: FetchAdapterOptions;

  public constructor(options: FetchAdapterOptions) {
    this.options = options;
  }

  public async action(context: ActionContext) {
    const request = await runAffectingHooks(makeRequest(context, this.options), [
      ...(this.options.transformRequests ?? []),
      ...useHooks<TransformRequestHook>('json-api.transform-request', context),
    ]);

    const response = await runRequest(request, this.options);
    const document = await parseResponse(response);
    if (response.ok) {
      return runAffectingHooks({ response, document }, [
        ...(this.options.transformResponses ?? []),
        ...useHooks<TransformResponseHook>('json-api.transform-response', context),
      ]);
    }

    const errors = document.errors ?? [];

    throw await runAffectingHooks(makeResponseError(response, errors), [
      ...(this.options.transformErrors ?? []),
      ...useHooks<TransformErrorHook>('json-api.transform-error', context),
    ]);
  }

  public async data(response: JsonApiResponse) {
    return response.document;
  }

  public isNotFound(error: unknown) {
    return error instanceof NotFoundError;
  }
}
