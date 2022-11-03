import JsonApiError from '@/fetch-json-api/errors/jsonApiError';
import { JsonApiErrorObject } from '@/fetch-json-api/errors/types';

export default class InvalidError extends JsonApiError {
  public constructor(response: Response, errors: JsonApiErrorObject[]) {
    super(response, errors);
  }
}
