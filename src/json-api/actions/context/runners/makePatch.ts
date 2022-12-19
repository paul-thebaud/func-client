import { Action, ActionContext, ConsumeAdapter } from '@/core';
import makeRequest, { RequestConfig } from '@/json-api/actions/context/runners/makeRequest';

export default function makePatch<R, RD>(
  pathOrBaseURL: string,
  payload?: unknown,
  config?: Omit<RequestConfig, 'method' | 'payload'>,
) {
  return <C extends ActionContext>(a: Action<C & ConsumeAdapter<R, RD>>) => a
    .use(makeRequest(pathOrBaseURL, {
      method: 'POST',
      payload,
      ...config,
    }));
}
