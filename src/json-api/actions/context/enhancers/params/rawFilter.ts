import { Action, ActionContext, param } from '@/core';

export default function rawFilter(
  filter: unknown,
) {
  return <C extends ActionContext>(a: Action<C>) => a.use(param('filter', filter));
}
