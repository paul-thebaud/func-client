import { AdapterError } from '@/core';

export default class FetchHttpClientError extends AdapterError {
  public constructor(message: string) {
    super(message);
  }
}
