import { Action, ActionContext, context } from '@/core';

export default function page<P>(pageParam: P) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    params: {
      ...a.context.params,
      page: pageParam,
    },
  }));
}
