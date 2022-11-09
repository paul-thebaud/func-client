import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';

export default function context<NC extends Partial<ActionContext>>(
  contextToMerge: NC,
) {
  return <C extends ActionContext>(a: Action<C>) => a.setContext({
    ...a.context,
    ...contextToMerge,
  });
}
