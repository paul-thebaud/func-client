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

export type JsonApiAdapterOptions = {
  baseURL?: string;
  fetch?: typeof fetch;
};

export type TransformRequestHook = (
  request: JsonApiRequest,
) => Promise<JsonApiRequest> | JsonApiRequest;

export type TransformResponseHook = (
  request: JsonApiResponse,
) => Promise<JsonApiResponse> | JsonApiResponse;

export type TransformErrorHook = (
  error: JsonApiAdapterError,
) => Promise<JsonApiAdapterError> | JsonApiAdapterError;

export type FetchAdapterOptions = {
  baseURL?: string;
  fetch?: typeof fetch;
  transformRequests?: TransformRequestHook[];
  transformResponses?: TransformResponseHook[];
  transformErrors?: TransformErrorHook[];
};
