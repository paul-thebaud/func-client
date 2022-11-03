import Action from '@/core/action/action';
import { ActionContext, ActionMethod } from '@/core/action/types';

export default function withMethod<C extends ActionContext, M extends ActionMethod>(method: M) {
  return (a: Action<C>) => a.merge({ method });
}
