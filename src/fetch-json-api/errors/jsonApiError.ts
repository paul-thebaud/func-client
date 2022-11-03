import { AdapterError } from '@/core';
import { JsonApiErrorObject } from '@/fetch-json-api/errors/types';

export default class JsonApiError extends AdapterError {
  private readonly response: Response;

  private readonly errors: JsonApiErrorObject[];

  public constructor(response: Response, errors: JsonApiErrorObject[]) {
    super(errors[0].detail || errors[0].title || 'Unknown error');

    this.response = response;
    this.errors = errors;
  }

  public getResponse() {
    return this.response;
  }

  public getErrors() {
    return this.errors;
  }
}
