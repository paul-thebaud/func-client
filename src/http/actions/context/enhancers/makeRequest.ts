import { Action, ActionContext, ActionMethod, ConsumeAdapter } from '@/core';
import httpContext from '@/http/actions/context/enhancers/httpContext';
import { HttpRequestConfig } from '@/http/types';
import { Dictionary } from '@/utilities';

export type RequestConfig = {
  method?: ActionMethod;
  params?: Dictionary<any> | string;
  headers?: Dictionary<string>;
  payload?: unknown;
};

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
