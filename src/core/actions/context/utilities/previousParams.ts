import { ActionContext } from '@/core/actions/types';
import FuncClientError from '@/core/errors/funcClientError';

export default function previousParams(context: ActionContext) {
  const prevParams = context.params;
  if (typeof prevParams === 'string') {
    throw new FuncClientError('Object and string params cannot be merged in action context');
  }

  return prevParams;
}
