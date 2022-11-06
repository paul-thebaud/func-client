import Action from '@/core/actions/action';
import { ActionContext, WithAdapterContext } from '@/core/actions/types';

export default function data<C extends ActionContext, R, D>() {
  return async (
    a: Action<WithAdapterContext<C, R, D>>,
  ) => a.context.adapter.data(await a.context.adapter.action(a.context));
}
