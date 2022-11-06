import { AdapterError } from '@/core';

export default class FetchError extends AdapterError {
  public constructor(message: string) {
    super(message);
  }
}
