import { Action, ActionContext, ActionMethod, ConsumeAdapter, context } from '@/core';
import { Dictionary } from '@/core/utilities/types';

export type RequestConfig = {
  method?: ActionMethod;
  params?: Dictionary<any> | string;
  headers?: Dictionary<string>;
  payload?: unknown;
};

export default function makeRequest<R, D>(
  pathOrBaseURL: string,
  config?: RequestConfig,
) {
  return <C extends ActionContext>(a: Action<C & ConsumeAdapter<R, D>>) => {
    const [baseURL, path] = pathOrBaseURL.startsWith('/')
      ? [pathOrBaseURL, undefined]
      : [undefined, pathOrBaseURL];

    return a.use(context({ baseURL, path, ...config }));
  };
}
