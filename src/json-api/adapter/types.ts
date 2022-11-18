import { Awaitable, Dictionary } from '@/core/utilities/types';
import JsonApiAdapterError from '@/json-api/adapter/errors/jsonApiAdapterError';
import { JsonApiDocument } from '@/json-api/types';

export type JsonApiRequest = {
  url: string;
  init: RequestInit;
};

export type JsonApiResponse = {
  response: Response;
  document: JsonApiDocument;
};

export type TransformRequest = (
  request: JsonApiRequest,
) => Awaitable<JsonApiRequest>;

export type TransformResponse = (
  request: JsonApiResponse,
) => Awaitable<JsonApiResponse>;

export type TransformError = (
  error: JsonApiAdapterError,
) => Awaitable<JsonApiAdapterError>;

export type FetchAdapterOptions = {
  baseURL?: string;
  fetch?: typeof fetch;
  paramsSerializer?: (params: Dictionary<any> | undefined) => string | undefined,
  transformRequests?: TransformRequest[];
  transformResponses?: TransformResponse[];
  transformErrors?: TransformError[];
};
