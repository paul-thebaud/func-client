import { Action, deepContext } from '@/core/actions';
import { ActionContext } from '@/core/actions/types';

export default function filterBy(key: string, value: unknown) {
  return <C extends ActionContext>(a: Action<C>) => a.use(deepContext({
    params: {
      ...a.context.params,
      filter: {
        [key]: value,
      },
    },
  }));
}
