import { Action, ActionContext, param } from '@/core';

export default function paginate<P>(pageParam: P) {
  return <C extends ActionContext>(a: Action<C>) => a.use(param('page', pageParam));
}
