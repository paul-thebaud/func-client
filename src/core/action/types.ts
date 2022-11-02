import { ModelId, ModelInstance } from '@/core/model/types';
import { Dictionary } from '@/core/utilities/types';
import { JsonApiRecord } from '@/fetch-json-api/types';

export type ActionMethod =
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

export type ActionContext = {
  method: ActionMethod;
  base?: string;
  type?: string;
  id?: ModelId;
  relation?: string;
  path?: string;
  params?: Dictionary;
  payload?: unknown;
  options?: Dictionary;
};

export type Adapter<R> = {
  action(context: ActionContext): Promise<R>;
  serializeOne(
    context: ActionContext,
    model: ModelInstance,
  ): Promise<JsonApiRecord>;
  deserializeOne(
    context: ActionContext,
    result: R,
  ): Promise<ModelInstance>;
  deserializeMany(
    context: ActionContext,
    result: R,
  ): Promise<ModelInstance[]>;
};
