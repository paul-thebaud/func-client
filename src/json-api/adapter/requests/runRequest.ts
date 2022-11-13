import FetchError from '@/json-api/adapter/errors/fetchError';
import { FetchAdapterOptions, JsonApiRequest } from '@/json-api/adapter/types';

export default async function runRequest(
  request: JsonApiRequest,
  options: FetchAdapterOptions,
): Promise<Response> {
  try {
    return await (options.fetch || window.fetch)(request.url, request.init);
  } catch (error) {
    throw new FetchError(
      error instanceof Error ? error.message : 'Unknown fetch error',
    );
  }
}
