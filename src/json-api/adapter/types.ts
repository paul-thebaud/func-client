import { ActionMethod, Awaitable, Dictionary } from '@/core';
import { JsonApiDocument, JsonApiError } from '@/json-api/types';

export type JsonApiRequest = {
  endpoint: string;
  method?: ActionMethod;
  params?: Dictionary<any> | string;
  headers?: Dictionary<string>;
  payload?: unknown;
};

export type JsonApiResponse<R> = {
  ok: boolean;
  status: number;
  response: R;
  document: JsonApiDocument;
};

export type JsonApiErrorResponse<R> = {
  response: JsonApiResponse<R>;
  errors: JsonApiError[];
};

export type HttpClient<R> = {
  request(request: JsonApiRequest): Promise<JsonApiResponse<R>>;
};

export type TransformRequest = (
  request: JsonApiRequest,
) => Awaitable<JsonApiRequest>;

export type TransformResponse<R> = (
  request: JsonApiResponse<R>,
) => Awaitable<JsonApiResponse<R>>;

export type TransformError<R> = (
  error: JsonApiErrorResponse<R>,
) => Awaitable<JsonApiErrorResponse<R>>;

export type AdapterOptions<R> = {
  httpClient: HttpClient<R>;
  baseURL?: string;
  transformTypeInPath?: (type: string) => string;
  transformRelationInPath?: (relation: string) => string;
  transformRequests?: TransformRequest[];
  transformResponses?: TransformResponse<R>[];
  transformErrors?: TransformError<R>[];
};
