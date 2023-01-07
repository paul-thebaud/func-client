import { Action, ConsumeAdapter } from '@/core';
import makeRequest from '@/http/actions/context/enhancers/makeRequest';
import { HttpActionContext, HttpRequestConfig } from '@/http/types';

export default function makeGet<AD>(
  pathOrBaseURL: string,
  config?: Omit<HttpRequestConfig, 'method' | 'body'>,
) {
  return <C extends HttpActionContext>(action: Action<C & ConsumeAdapter<AD>>) => action
    .use(makeRequest(pathOrBaseURL, {
      method: 'GET',
      ...config,
    }));
}
