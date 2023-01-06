import { Action, context } from '@/core';
import { HttpActionContext } from '@/http/types';

export default function httpContext<NC extends Partial<HttpActionContext>>(
  contextToMerge: NC,
) {
  return <C extends HttpActionContext>(action: Action<C>) => action.use(context(contextToMerge));
}
