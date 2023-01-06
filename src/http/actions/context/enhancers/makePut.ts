import { Action, ConsumeAdapter } from '@/core';
import makeRequest, { RequestConfig } from '@/http/actions/context/enhancers/makeRequest';
import { HttpActionContext } from '@/http/types';

export default function makePut<AD>(
  pathOrBaseURL: string,
  body?: BodyInit,
  config?: Omit<RequestConfig, 'method' | 'body'>,
) {
  return <C extends HttpActionContext>(action: Action<C & ConsumeAdapter<AD>>) => action
    .use(makeRequest(pathOrBaseURL, {
      method: 'POST',
      body,
      ...config,
    }));
}
