import ConflictError from '@/json-api/adapter/errors/conflictError';
import ForbiddenError from '@/json-api/adapter/errors/forbiddenError';
import InvalidError from '@/json-api/adapter/errors/invalidError';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';
import ServerError from '@/json-api/adapter/errors/serverError';
import UnauthorizedError from '@/json-api/adapter/errors/unauthorizedError';
import { JsonApiError } from '@/json-api/types';

export default function throwResponseError(
  response: Response,
  errors: JsonApiError[],
): never {
  if (response.status >= 500) {
    throw new ServerError(response, errors);
  } else if (response.status === 401) {
    throw new UnauthorizedError(response, errors);
  } else if (response.status === 403) {
    throw new ForbiddenError(response, errors);
  } else if (response.status === 404) {
    throw new NotFoundError(response, errors);
  } else if (response.status === 409) {
    throw new ConflictError(response, errors);
  }

  throw new InvalidError(response, errors);
}
