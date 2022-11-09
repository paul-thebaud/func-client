import { Action, ActionContext, ConsumeAdapter } from '@/core';
import makeRequest, { RequestConfig } from '@/json-api/actions/context/consumers/makeRequest';

export default function makeGet<R, D>(
  pathOrBaseURL: string,
  config?: Omit<RequestConfig, 'method'>,
) {
  return <C extends ActionContext>(a: Action<C & ConsumeAdapter<R, D>>) => a
    .use(makeRequest(pathOrBaseURL, {
      method: 'GET',
      ...config,
    }));
}
