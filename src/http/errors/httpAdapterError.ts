import { FuncClientError } from '@/core';
import { HttpRequest } from '@/http/types';

export default class HttpAdapterError extends FuncClientError {
  public request: HttpRequest;

  public constructor(message: string, request: HttpRequest) {
    super(message);

    this.request = request;
  }
}
