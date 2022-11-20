import ConflictError from '@/json-api/adapter/errors/conflictError';
import ForbiddenError from '@/json-api/adapter/errors/forbiddenError';
import InvalidError from '@/json-api/adapter/errors/invalidError';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';
import ServerError from '@/json-api/adapter/errors/serverError';
import TooManyRequestsError from '@/json-api/adapter/errors/tooManyRequestsError';
import UnauthorizedError from '@/json-api/adapter/errors/unauthorizedError';
import { JsonApiResponse } from '@/json-api/adapter/types';

export default function makeError<R>(response: JsonApiResponse<R>) {
  if (response.status >= 500) {
    return new ServerError(response);
  }

  if (response.status === 401) {
    return new UnauthorizedError(response);
  }

  if (response.status === 403) {
    return new ForbiddenError(response);
  }

  if (response.status === 404) {
    return new NotFoundError(response);
  }

  if (response.status === 409) {
    return new ConflictError(response);
  }

  if (response.status === 429) {
    return new TooManyRequestsError(response);
  }

  return new InvalidError(response);
}
