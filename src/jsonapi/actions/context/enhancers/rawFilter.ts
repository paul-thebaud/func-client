import { Action, ActionContext } from '@/core';
import { param } from '@/http';

export default function rawFilter(
  filter: unknown,
) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('filter', filter));
}
