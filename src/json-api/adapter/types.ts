import { JsonApiDocument } from '@/json-api/types';

export type JsonApiRequestContext = {
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
