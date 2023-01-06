import { Action } from '@/core';
import httpContext from '@/http/actions/context/enhancers/httpContext';
import { HttpActionContext } from '@/http/types';

export default function fullPath(newPath: string) {
  return <C extends HttpActionContext>(action: Action<C>) => action.use(httpContext({
    type: undefined,
    id: undefined,
    relation: undefined,
    path: newPath,
  }));
}
