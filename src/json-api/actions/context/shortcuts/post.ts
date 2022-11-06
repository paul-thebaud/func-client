import { Action, ActionContext, WithAdapterContext } from '@/core';
import request, { RequestConfig } from '@/json-api/actions/context/shortcuts/request';

export default function post<C extends ActionContext, R, D>(
  pathOrBaseURL: string,
  payload?: BodyInit,
  config?: Omit<RequestConfig, 'method' | 'payload'>,
) {
  return (a: Action<WithAdapterContext<C, R, D>>) => a.run(request(pathOrBaseURL, {
    method: 'POST',
    payload,
    ...config,
  }));
}
