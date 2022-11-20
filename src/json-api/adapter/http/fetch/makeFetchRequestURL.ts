import optionalJoin from '@/core/utilities/optionalJoin';
import type { FetchHttpClientOptions } from '@/json-api/adapter/http/fetch/fetchHttpClient';
import { JsonApiRequest } from '@/json-api/adapter/types';

export default function makeFetchRequestURL(
  request: JsonApiRequest,
  options: FetchHttpClientOptions,
) {
  const params = (request.params && typeof request.params === 'object')
    ? options.paramsSerializer(request.params)
    : request.params;

  return optionalJoin([request.endpoint, params], '?');
}
