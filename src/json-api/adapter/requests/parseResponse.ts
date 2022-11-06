import JsonParseError from '@/json-api/adapter/errors/jsonParseError';
import { JsonApiDocument } from '@/json-api/types';

export default async function parseResponse(
  response: Response,
): Promise<JsonApiDocument | undefined> {
  if (response.status === 204) {
    return undefined;
  }

  try {
    return await response.json();
  } catch (error) {
    throw new JsonParseError(
      error instanceof Error ? error.message : 'Unknown response JSON parse error',
    );
  }
}
