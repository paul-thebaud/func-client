import ConflictError from '@/json-api/adapter/errors/conflictError';
import ForbiddenError from '@/json-api/adapter/errors/forbiddenError';
import InvalidError from '@/json-api/adapter/errors/invalidError';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';
import ServerError from '@/json-api/adapter/errors/serverError';
import TooManyRequestsError from '@/json-api/adapter/errors/tooManyRequestsError';
import UnauthorizedError from '@/json-api/adapter/errors/unauthorizedError';
import { JsonApiError } from '@/json-api/types';

export default function makeResponseError(
  response: Response,
  errors: JsonApiError[],
) {
  if (response.status >= 500) {
    return new ServerError(response, errors);
  }

  if (response.status === 401) {
    return new UnauthorizedError(response, errors);
  }

  if (response.status === 403) {
    return new ForbiddenError(response, errors);
  }

  if (response.status === 404) {
    return new NotFoundError(response, errors);
  }

  if (response.status === 409) {
    return new ConflictError(response, errors);
  }

  if (response.status === 429) {
    return new TooManyRequestsError(response, errors);
  }

  return new InvalidError(response, errors);
}
