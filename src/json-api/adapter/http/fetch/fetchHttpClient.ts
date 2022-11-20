import { Dictionary } from '@/core';
import FetchHttpClientError from '@/json-api/adapter/http/fetch/fetchHttpClientError';
import makeFetchRequestInit from '@/json-api/adapter/http/fetch/makeFetchRequestInit';
import makeFetchRequestURL from '@/json-api/adapter/http/fetch/makeFetchRequestURL';
import { HttpClient, JsonApiRequest } from '@/json-api/adapter/types';

export type FetchHttpClientOptions = {
  fetch?: typeof fetch;
  jsonContentTypes?: string[];
  paramsSerializer: (params: Dictionary) => string | undefined;
};

export default class FetchHttpClient implements HttpClient<Response> {
  private readonly options: FetchHttpClientOptions;

  public constructor(options: FetchHttpClientOptions) {
    this.options = options;
  }

  public async request(request: JsonApiRequest) {
    const requestURL = makeFetchRequestURL(request, this.options);
    const requestInit = makeFetchRequestInit(request, this.options);

    try {
      const response = await (this.options.fetch ?? window.fetch)(requestURL, requestInit);
      const document = await response.json();

      return {
        ok: response.ok,
        status: response.status,
        response,
        document,
      };
    } catch (error) {
      throw new FetchHttpClientError(error instanceof Error ? error.message : 'Unknown fetch error');
    }
  }
}
