import Action from '@/core/action/action';
import { ActionContext, WithAdapterContext } from '@/core/action/types';

export default function raw<C extends ActionContext>() {
  return <R>(
    context: Action<WithAdapterContext<C, R>>,
  ) => context.context.adapter.action(context.context);
}
