import InvalidError from '@/fetch-json-api/errors/invalidError';
import { JsonApiErrorObject } from '@/fetch-json-api/errors/types';

export default class ConflictError extends InvalidError {
  public constructor(response: Response, errors: JsonApiErrorObject[]) {
    super(response, errors);
  }
}
