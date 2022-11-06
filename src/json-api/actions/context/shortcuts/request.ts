import { Action, ActionContext, raw, withAction, WithAdapterContext } from '@/core';

export type RequestConfig =
  & Omit<ActionContext, 'baseURL' | 'type' | 'id' | 'relation' | 'path'>
  & { headers?: HeadersInit; };

export default function request<C extends ActionContext, R, D>(
  pathOrBaseURL: string,
  config?: RequestConfig,
) {
  return (a: Action<WithAdapterContext<C, R, D>>) => {
    const [baseURL, path] = pathOrBaseURL.startsWith('/')
      ? [pathOrBaseURL, undefined]
      : [undefined, pathOrBaseURL];

    return a.use(withAction({ baseURL, path, ...config })).run(raw());
  };
}
