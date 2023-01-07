import { Action, ActionContext, ConsumeAdapter } from '@/core';
import httpContext from '@/http/actions/context/enhancers/httpContext';
import { HttpRequestConfig } from '@/http/types';

export default function makeRequest<AD>(
  pathOrBaseURL: string,
  config?: HttpRequestConfig,
) {
  return <C extends ActionContext>(action: Action<C & ConsumeAdapter<AD>>) => {
    const [baseURL, path] = pathOrBaseURL.startsWith('/')
      ? [pathOrBaseURL, undefined]
      : [undefined, pathOrBaseURL];

    return action.use(httpContext({ baseURL, path, ...config }));
  };
}
