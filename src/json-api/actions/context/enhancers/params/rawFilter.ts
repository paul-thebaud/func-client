import { Action, ActionContext, context } from '@/core';

export default function rawFilter(
  filter: unknown,
) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    params: {
      ...a.context.params,
      filter,
    },
  }));
}
