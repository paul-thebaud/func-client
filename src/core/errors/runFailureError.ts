import FuncClientError from '@/core/errors/funcClientError';

export default class RunFailureError extends FuncClientError {
  public constructor(message: string) {
    super(message);
  }
}
