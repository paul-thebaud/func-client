import { Action, ActionContext, param } from '@/core';
import previousParams from '@/core/actions/context/utilities/previousParams';

export default function filter(key: string, value: unknown) {
  return async <C extends ActionContext>(a: Action<C>) => a.use(param('filter', {
    ...previousParams(await a.getContext())?.filter,
    [key]: value,
  }));
}
