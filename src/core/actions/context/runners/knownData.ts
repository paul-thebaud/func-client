import Action from '@/core/actions/action';
import { ActionContext, WithAdapterContext } from '@/core/actions/types';

export default function knownData<ND = any>() {
  return async <C extends ActionContext, R, D>(
    a: Action<WithAdapterContext<C, R, D>>,
  ) => a.context.adapter.data(await a.context.adapter.action(a.context)) as unknown as Promise<ND>;
}
