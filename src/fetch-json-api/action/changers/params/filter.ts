import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

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
