import { ActionMethod } from '@/core/action/types';

export default function method<C, M extends ActionMethod>(actionMethod: M) {
  return (context: C) => ({
    ...context,
    method: actionMethod,
  });
}
