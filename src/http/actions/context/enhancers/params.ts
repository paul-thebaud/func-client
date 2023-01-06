import { Action, context } from '@/core';
import { HttpActionContext } from '@/http/types';
import { Dictionary } from '@/utilities';

export default function params(newParams: Dictionary<any> | string) {
  return <C extends HttpActionContext>(
    action: Action<C>,
  ) => action.use(context({ params: newParams }));
}
