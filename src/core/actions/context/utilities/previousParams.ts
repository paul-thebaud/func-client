import { ActionContext } from '@/core/actions/types';
import FuncModelError from '@/core/errors/funcModelError';

export default function previousParams(context: ActionContext) {
  const prevParams = context.params;
  if (typeof prevParams === 'string') {
    throw new FuncModelError('Object and string params cannot be merged in action context');
  }

  return prevParams;
}
