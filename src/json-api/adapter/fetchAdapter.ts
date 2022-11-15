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
  TransformError,
  TransformRequest,
  TransformResponse,
} from '@/json-api/adapter/types';
import { JsonApiDocument } from '@/json-api/types';

export default class FetchAdapter implements AdapterI<JsonApiResponse, JsonApiDocument> {
  private options: FetchAdapterOptions;

  public constructor(options: FetchAdapterOptions) {
    this.options = options;
  }

  public async action(context: ActionContext) {
    const request = await runAffectingHooks([
      ...(this.options.transformRequests ?? []),
      ...useHooks<TransformRequest>('json-api.transform-request', context),
    ], makeRequest(context, this.options));

    const response = await runRequest(request, this.options);
    const document = await parseResponse(response);
    if (response.ok) {
      return runAffectingHooks([
        ...(this.options.transformResponses ?? []),
        ...useHooks<TransformResponse>('json-api.transform-response', context),
      ], { response, document });
    }

    const errors = document.errors ?? [];

    throw await runAffectingHooks([
      ...(this.options.transformErrors ?? []),
      ...useHooks<TransformError>('json-api.transform-error', context),
    ], makeResponseError(response, errors));
  }

  public async data(response: JsonApiResponse) {
    return response.document;
  }

  public isNotFound(error: unknown) {
    return error instanceof NotFoundError;
  }
}
