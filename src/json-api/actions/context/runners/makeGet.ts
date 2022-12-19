import { Action, ActionContext, ConsumeAdapter } from '@/core';
import makeRequest, { RequestConfig } from '@/json-api/actions/context/runners/makeRequest';

export default function makeGet<R, RD>(
  pathOrBaseURL: string,
  config?: Omit<RequestConfig, 'method'>,
) {
  return <C extends ActionContext>(a: Action<C & ConsumeAdapter<R, RD>>) => a
    .use(makeRequest(pathOrBaseURL, {
      method: 'GET',
      ...config,
    }));
}
