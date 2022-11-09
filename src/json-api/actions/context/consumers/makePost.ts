import { Action, ActionContext, ConsumeAdapter } from '@/core';
import makeRequest, { RequestConfig } from '@/json-api/actions/context/consumers/makeRequest';

export default function makePost<R, D>(
  pathOrBaseURL: string,
  payload?: unknown,
  config?: Omit<RequestConfig, 'method' | 'payload'>,
) {
  return <C extends ActionContext>(a: Action<C & ConsumeAdapter<R, D>>) => a
    .use(makeRequest(pathOrBaseURL, {
      method: 'POST',
      payload,
      ...config,
    }));
}
