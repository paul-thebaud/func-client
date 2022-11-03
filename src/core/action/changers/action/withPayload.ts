import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function withPayload<C extends ActionContext>(payload: unknown) {
  return (a: Action<C>) => a.merge({ payload });
}
