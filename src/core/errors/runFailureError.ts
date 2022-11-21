import FuncModelError from '@/core/errors/funcModelError';

export default class RunFailureError extends FuncModelError {
  public constructor(message: string) {
    super(message);
  }
}
