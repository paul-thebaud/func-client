import { Action, ActionContext } from '@/core';
import { param } from '@/http';

export default function rawSort(
  sort: string | undefined,
) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('sort', sort));
}
