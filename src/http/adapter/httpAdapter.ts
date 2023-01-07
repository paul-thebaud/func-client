import { AdapterI } from '@/core';
import paramsSerializer from '@/http/adapter/paramsSerializer';
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
  HttpAdapterConfig,
  HttpParamsSerializer,
  HttpRequest,
  HttpRequestInit,
  RequestTransformer,
  ResponseTransformer,
} from '@/http/types';
import { Dictionary, isNil, optionalJoin, sequentialTransform } from '@/utilities';

export default abstract class HttpAdapter implements AdapterI<Response> {
  private fetch = fetch;

  private paramsSerializer: HttpParamsSerializer = paramsSerializer;

  private baseURL: string | undefined = undefined;

  private requestTransformers: RequestTransformer[] = [];

  private responseTransformers: ResponseTransformer[] = [];

  private errorTransformers: ErrorTransformer[] = [];

  public constructor(config: HttpAdapterConfig) {
    this.configure(config);
  }

  public configure(config: HttpAdapterConfig) {
    Object.assign(this, config);

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

  /**
   * @inheritDoc
   */
  public isNotFound(error: unknown) {
    return error instanceof NotFoundError;
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
      headers: context.headers ?? {},
      body: context.body,
    } as HttpRequestInit;
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
    // Destructure to avoid calling fetch with this context.
    const { fetch } = this;

    return fetch(request.url, request.init);
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
