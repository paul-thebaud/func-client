import { ModelId } from '@/core/model/types';
import { Awaitable, Dictionary } from '@/core/utilities/types';

export type HttpMethod =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK';

// TODO real ActionContext.
type ActionContext = {
  action?: 'READ' | 'CREATE' | 'UPDATE' | 'DESTROY';
  type?: string;
  id?: ModelId;
  relation?: string;
  includes?: string[];
};

export type HttpActionContext = ActionContext & {
  method?: HttpMethod;
  baseURL?: string;
  path?: string;
  params?: Dictionary | string;
  headers?: HeadersInit;
  // TODO "dataAs"?
  body?: BodyInit;
  requestTransformers?: RequestTransformer[];
  responseTransformers?: ResponseTransformer[];
  errorTransformers?: ErrorTransformer[];
};

export type HttpParamsSerializer = (params: Dictionary) => string | undefined;

export type HttpRequest = {
  context: HttpActionContext;
  url: string;
  init: RequestInit;
};

export type RequestTransformer = (request: HttpRequest) => Awaitable<HttpRequest>;
export type ResponseTransformer = (response: Response) => Awaitable<Response>;
export type ErrorTransformer = (error: unknown) => Awaitable<unknown>;
