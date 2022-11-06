import { AdapterError } from '@/core';
import { JsonApiError } from '@/json-api/types';

export default class JsonApiAdapterError extends AdapterError {
  private readonly response: Response;

  private readonly errors: JsonApiError[];

  public constructor(response: Response, errors: JsonApiError[]) {
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
