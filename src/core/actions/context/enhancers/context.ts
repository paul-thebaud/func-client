import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';

export default function context<NC extends Partial<ActionContext>>(
  contextToMerge: NC,
) {
  return async <C extends ActionContext>(action: Action<C>) => action.setContext({
    ...(await action.getContext()),
    ...contextToMerge,
  });
}
