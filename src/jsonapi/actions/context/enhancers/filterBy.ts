import { Action, ActionContext } from '@/core';
import { param } from '@/http';
import prevParams from '@/http/actions/context/utilities/prevParams';

export default function filterBy(key: string, value: unknown) {
  return async <C extends ActionContext>(action: Action<C>) => action.use(param('filter', {
    ...prevParams(await action.context)?.filter,
    [key]: value,
  }));
}
