import { AdapterError } from '@/core';

export default class JsonParseError extends AdapterError {
  public constructor(message: string) {
    super(message);
  }
}
