import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';

export default function context<NC extends Partial<ActionContext>>(
  contextToMerge: NC,
) {
  return async <C extends ActionContext>(action: Action<C>) => action.updateContext({
    ...(await action.context),
    ...contextToMerge,
  });
}
