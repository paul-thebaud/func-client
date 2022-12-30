import { NewAdapterI } from '@/core';
import isNil from '@/core/utilities/isNil';
import optionalJoin from '@/core/utilities/optionalJoin';
import sequentialTransform from '@/core/utilities/sequentialTransform';
import { Dictionary } from '@/core/utilities/types';
import ConflictError from '@/http/errors/conflictError';
import ForbiddenError from '@/http/errors/forbiddenError';
import InterruptedError from '@/http/errors/interruptedError';
import InvalidRequestError from '@/http/errors/invalidRequestError';
import NotFoundError from '@/http/errors/notFoundError';
import ServerError from '@/http/errors/serverError';
import TooManyRequestsError from '@/http/errors/tooManyRequestsError';
import UnauthorizedError from '@/http/errors/unauthorizedError';
import {
  ErrorTransformer,
  HttpActionContext,
  HttpParamsSerializer,
  HttpRequest,
  RequestTransformer,
  ResponseTransformer,
} from '@/http/types';

export type FetchAdapterOptions = {
  fetch?: typeof fetch;
  baseURL?: string;
  paramsSerializer: HttpParamsSerializer;
  requestTransformers?: RequestTransformer[];
  responseTransformers?: ResponseTransformer[];
  errorTransformers?: ErrorTransformer[];
};

export default abstract class HttpAdapter implements NewAdapterI<Response> {
  private fetch!: typeof fetch;

  private baseURL!: string | undefined;

  private paramsSerializer!: HttpParamsSerializer;

  private requestTransformers!: RequestTransformer[];

  private responseTransformers!: ResponseTransformer[];

  private errorTransformers!: ErrorTransformer[];

  public constructor(options: FetchAdapterOptions) {
    this
      .withFetch(options.fetch ?? fetch)
      .withBaseURL(options.baseURL)
      .withParamsSerializer(options.paramsSerializer)
      .withRequestTransformers(options.requestTransformers)
      .withResponseTransformers(options.responseTransformers)
      .withErrorTransformers(options.errorTransformers);
  }

  public withFetch(fetchImpl: typeof fetch) {
    this.fetch = fetchImpl;

    return this;
  }

  public withBaseURL(baseURL?: string) {
    this.baseURL = baseURL;

    return this;
  }

  public withParamsSerializer(paramsSerializer: HttpParamsSerializer) {
    this.paramsSerializer = paramsSerializer;

    return this;
  }

  public withRequestTransformers(transformers?: RequestTransformer[]) {
    this.requestTransformers = transformers ?? [];

    return this;
  }

  public withResponseTransformers(transformers?: ResponseTransformer[]) {
    this.responseTransformers = transformers ?? [];

    return this;
  }

  public withErrorTransformers(transformers?: ErrorTransformer[]) {
    this.errorTransformers = transformers ?? [];

    return this;
  }

  /**
   * @inheritDoc
   */
  public async execute(context: HttpActionContext): Promise<Response> {
    const request = await this.transformRequest(context, await this.makeRequest(context));

    let response: Response;
    try {
      response = await this.runRequest(request);
    } catch (error) {
      throw await this.transformError(context, new InterruptedError(
        error instanceof Error ? error.message : 'Unknown fetch adapter error',
        request,
        error,
      ));
    }

    if (response.status >= 200 && response.status < 300) {
      return this.transformResponse(context, response);
    }

    throw await this.transformError(context, await this.makeError(request, response));
  }

  protected async makeRequest(context: HttpActionContext): Promise<HttpRequest> {
    return {
      context,
      url: this.makeRequestURL(context),
      init: this.makeRequestInit(context),
    };
  }

  protected makeRequestURL(context: HttpActionContext) {
    return optionalJoin([
      this.makeRequestURLEndpoint(context),
      this.makeRequestURLParams(context),
    ], '?');
  }

  protected makeRequestInit(context: HttpActionContext) {
    return {
      method: this.makeRequestMethod(context),
      headers: context.headers,
      body: context.body,
    };
  }

  protected makeRequestMethod(context: HttpActionContext) {
    return (context.method ?? {
      READ: 'GET',
      CREATE: 'POST',
      UPDATE: 'PATCH',
      DESTROY: 'DELETE',
    }[context.action ?? 'READ']).toUpperCase();
  }

  protected makeRequestURLEndpoint(context: HttpActionContext) {
    // TODO Transform type and relation.
    return optionalJoin([
      isNil(context.baseURL) ? this.baseURL : context.baseURL,
      isNil(context.type) ? undefined : context.type,
      isNil(context.id) ? undefined : `${context.id}`,
      isNil(context.relation) ? undefined : context.relation,
      context.path,
    ], '/');
  }

  protected makeRequestURLParams(context: HttpActionContext) {
    if (typeof context.params === 'string') {
      return this.makeRequestURLParamsFromString(context, context.params);
    }

    if (context.params) {
      return this.makeRequestURLParamsFromObject(context, context.params);
    }

    return undefined;
  }

  protected makeRequestURLParamsFromString(_context: HttpActionContext, params: string) {
    return params;
  }

  protected makeRequestURLParamsFromObject(_context: HttpActionContext, params: Dictionary) {
    return this.paramsSerializer(params);
  }

  protected runRequest(request: HttpRequest) {
    return this.fetch(request.url, request.init);
  }

  protected async makeError(request: HttpRequest, response: Response): Promise<unknown> {
    switch (true) {
      case response.status >= 500:
        return new ServerError(request, response);
      case response.status === 401:
        return new UnauthorizedError(request, response);
      case response.status === 403:
        return new ForbiddenError(request, response);
      case response.status === 404:
        return new NotFoundError(request, response);
      case response.status === 409:
        return new ConflictError(request, response);
      case response.status === 429:
        return new TooManyRequestsError(request, response);
      default:
        return new InvalidRequestError(request, response);
    }
  }

  protected transformRequest(context: HttpActionContext, request: HttpRequest) {
    return sequentialTransform([
      ...this.requestTransformers,
      ...(context.requestTransformers ?? []),
    ], request);
  }

  protected transformResponse(context: HttpActionContext, response: Response) {
    return sequentialTransform([
      ...this.responseTransformers,
      ...(context.responseTransformers ?? []),
    ], response);
  }

  protected transformError(context: HttpActionContext, error: unknown): unknown {
    return sequentialTransform([
      ...this.errorTransformers,
      ...(context.errorTransformers ?? []),
    ], error);
  }
}
