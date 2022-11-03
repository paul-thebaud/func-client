import { ModelId, ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import { Store } from '@/core/store/types';
import { Dictionary } from '@/core/utilities/types';

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
  store?: Store;
  adapter?: Adapter<unknown>;
  schema?: ModelSchemaRaw;
  method?: ActionMethod;
  baseURL?: string;
  type?: string;
  id?: ModelId;
  relation?: string;
  path?: string;
  params?: Dictionary;
  payload?: unknown;
  options?: Dictionary;
  [key: string]: unknown;
};

export type ForSchemaContext<C extends ActionContext = ActionContext,
  S extends ModelSchemaRaw = ModelSchemaRaw> = { schema: S; } & C;

export type ForModelContext<C extends ActionContext = ActionContext,
  S extends ModelSchemaRaw = ModelSchemaRaw> = { type: string; } & ForSchemaContext<C, S>;

export type WithStoreContext<C extends ActionContext = ActionContext, S extends Store = Store> = {
  store: S;
} & C;

export type WithAdapterContext<C extends ActionContext = ActionContext, R = unknown> = {
  adapter: Adapter<R>;
} & C;

export type Adapter<R> = {
  action(context: ActionContext): Promise<R>;
  serializeOne(
    context: ActionContext,
    model: ModelInstance,
  ): Promise<unknown>; // TODO This should be generic.
  deserializeOne(
    context: ActionContext,
    result: R,
  ): Promise<ModelInstance>;
  deserializeMany(
    context: ActionContext,
    result: R,
  ): Promise<ModelInstance[]>;
};
