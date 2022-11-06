import { Action, ActionContext } from '@/core';

export default function filter<C extends ActionContext>(
  clause: unknown,
) {
  return (a: Action<C>) => a.merge({
    params: {
      ...a.context.params,
      filter: clause,
    },
  });
}
