import { Action, ActionContext } from '@/core';
import { param } from '@/http';

export default function paginate<P>(pageParam: P) {
  return <C extends ActionContext>(action: Action<C>) => action.use(param('page', pageParam));
}
