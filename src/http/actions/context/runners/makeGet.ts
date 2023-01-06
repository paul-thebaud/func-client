import { Action, ConsumeAdapter } from '@/core';
import makeRequest, { RequestConfig } from '@/http/actions/context/runners/makeRequest';
import { HttpActionContext } from '@/http/types';

export default function makeGet<AD>(
  pathOrBaseURL: string,
  config?: Omit<RequestConfig, 'method' | 'body'>,
) {
  return <C extends HttpActionContext>(action: Action<C & ConsumeAdapter<AD>>) => action
    .use(makeRequest(pathOrBaseURL, {
      method: 'GET',
      ...config,
    }));
}
