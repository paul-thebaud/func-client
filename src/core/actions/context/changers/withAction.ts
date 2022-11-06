import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';

export default function withAction<C extends ActionContext, NC extends Partial<ActionContext>>(
  action: NC,
) {
  return (a: Action<C>) => a.merge(action);
}
