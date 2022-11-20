import { AdapterI } from '@/core';
import { ActionContext } from '@/core/actions/types';
import sequentialTransform from '@/core/utilities/sequentialTransform';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';
import makeError from '@/json-api/adapter/makeError';
import makeRequest from '@/json-api/adapter/makeRequest';
import { AdapterOptions, JsonApiResponse } from '@/json-api/adapter/types';
import { JsonApiDocument } from '@/json-api/types';

export default class Adapter<R> implements AdapterI<JsonApiResponse<R>, JsonApiDocument> {
  private readonly options: AdapterOptions<R>;

  public constructor(options: AdapterOptions<R>) {
    this.options = options;
  }

  public async action(context: ActionContext) {
    const request = await sequentialTransform(
      this.options.transformRequests ?? [],
      makeRequest(context, this.options),
    );

    const response = await this.options.httpClient.request(request);

    if (response.ok) {
      return sequentialTransform(
        this.options.transformResponses ?? [],
        response,
      );
    }

    throw await sequentialTransform(
      this.options.transformErrors ?? [],
      makeError(response),
    );
  }

  public async data(response: JsonApiResponse<R>) {
    return response.document;
  }

  public isNotFound(error: unknown) {
    return error instanceof NotFoundError;
  }
}
