import FetchError from '@/json-api/adapter/errors/fetchError';
import { JsonApiAdapterOptions, JsonApiRequestContext } from '@/json-api/adapter/types';

export default async function runRequest(
  request: JsonApiRequestContext,
  options: JsonApiAdapterOptions,
): Promise<Response> {
  try {
    return await (options.fetch || window.fetch)(request.url, request.init);
  } catch (error) {
    throw new FetchError(
      error instanceof Error ? error.message : 'Unknown fetch error',
    );
  }
}
