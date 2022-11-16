import { Action, ActionContext, param } from '@/core';

export default function filter(key: string, value: unknown) {
  return <C extends ActionContext>(a: Action<C>) => a.use(param('filter', {
    ...a.context.params?.filter,
    [key]: value,
  }));
}
