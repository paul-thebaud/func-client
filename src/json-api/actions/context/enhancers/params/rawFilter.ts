import { ActionContext, deepContext } from '@/core';
import { Action } from '@/core/actions';

export default function rawFilter(
  filter: unknown,
) {
  return <C extends ActionContext>(a: Action<C>) => a.use(deepContext({
    params: {
      ...a.context.params,
      filter,
    },
  }));
}
