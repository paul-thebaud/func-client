import { Action, ActionContext, context } from '@/core';

export default function filterBy(key: string, value: unknown) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    params: {
      ...a.context.params,
      filter: {
        ...a.context.params?.filter,
        [key]: value,
      },
    },
  }));
}
