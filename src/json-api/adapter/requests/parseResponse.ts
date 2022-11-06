import JsonParseError from '@/json-api/adapter/errors/jsonParseError';
import { JsonApiDocument } from '@/json-api/types';

export default async function parseResponse(
  response: Response,
): Promise<JsonApiDocument> {
  if (response.status === 204) {
    return {};
  }

  try {
    return await response.json();
  } catch (error) {
    throw new JsonParseError(
      error instanceof Error ? error.message : 'Unknown response JSON parse error',
    );
  }
}
