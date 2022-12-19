import type { FetchHttpClientOptions } from '@/json-api/adapter/http/fetch/fetchHttpClient';
import { JsonApiRequest } from '@/json-api/adapter/types';

export default function makeFetchRequestInit(
  request: JsonApiRequest,
  options: FetchHttpClientOptions,
) {
  const method = (request.method ?? 'GET').toUpperCase();
  const headers = request.headers ?? {};

  let payload: unknown;
  if (request.payload instanceof FormData) {
    delete headers['Content-Type'];
    payload = request.payload;
  } else if (request.payload !== undefined) {
    const contentType = headers['Content-Type'];
    const jsonContentTypes = options.jsonContentTypes ?? [
      'application/json', 'application/vnd.api+json',
    ];
    if (contentType && jsonContentTypes.indexOf(contentType)) {
      payload = JSON.stringify(request.payload);
    } else {
      payload = request.payload;
    }
  }

  return {
    method,
    headers,
    body: payload,
  } as RequestInit;
}
