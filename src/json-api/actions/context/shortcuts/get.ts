import { Action, ActionContext, WithAdapterContext } from '@/core';
import request, { RequestConfig } from '@/json-api/actions/context/shortcuts/request';

export default function get<C extends ActionContext, R, D>(
  pathOrBaseURL: string,
  config?: Omit<RequestConfig, 'method'>,
) {
  return (a: Action<WithAdapterContext<C, R, D>>) => a.use(request(pathOrBaseURL, {
    method: 'GET',
    ...config,
  }));
}
