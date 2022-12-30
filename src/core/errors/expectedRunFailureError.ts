import FuncClientError from '@/core/errors/funcClientError';

export default class ExpectedRunFailureError extends FuncClientError {
  public constructor(message: string) {
    super(message);
  }
}
