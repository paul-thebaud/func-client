import { Action, ActionContext, ConsumeAdapter, context } from '@/core';

export type RequestConfig =
  & Omit<ActionContext, 'baseURL' | 'type' | 'id' | 'relation' | 'path'>
  & { headers?: HeadersInit; };

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
