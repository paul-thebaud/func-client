import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function withAction<C extends ActionContext, NC extends Partial<ActionContext>>(
  action: NC,
) {
  return (a: Action<C>) => a.merge(action);
}
