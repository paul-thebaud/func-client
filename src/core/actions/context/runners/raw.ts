import Action from '@/core/actions/action';
import { ActionContext, WithAdapterContext } from '@/core/actions/types';

export default function raw<C extends ActionContext, R, D>() {
  return (
    a: Action<WithAdapterContext<C, R, D>>,
  ) => a.context.adapter.action(a.context);
}
