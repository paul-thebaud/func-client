import { ModelClass, ModelId, ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import { Store } from '@/core/store/types';
import { Adapter, Deserializer, Serializer } from '@/core/types';
import { Constructor, Dictionary } from '@/core/utilities/types';

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
  method?: ActionMethod;
  baseURL?: string;
  type?: string;
  id?: ModelId;
  relation?: string;
  path?: string;
  params?: Dictionary;
  payload?: unknown;
  [key: string]: unknown;
};

export type ForSchemaContext<C extends ActionContext = ActionContext,
  S extends ModelSchemaRaw = ModelSchemaRaw> =
  & C
  & { schema: S; };

export type ForModelContext<C extends ActionContext = ActionContext,
  S extends ModelSchemaRaw = ModelSchemaRaw, I = ModelInstance<S>> =
  & ForSchemaContext<C, S>
  & { type: string; model: ModelClass<S> & Constructor<I>; };

export type ForInstanceContext<C extends ActionContext = ActionContext,
  S extends ModelSchemaRaw = ModelSchemaRaw, I = ModelInstance<S>> =
  & ForModelContext<C, S>
  & { instance: ModelInstance<S> & I; };

export type WithStoreContext<C extends ActionContext = ActionContext, S extends Store = Store> =
  & C
  & { store: S; };

export type WithAdapterContext<C extends ActionContext = ActionContext, R = unknown, D = unknown> =
  & C
  & { adapter: Adapter<R, D>; };

export type WithSerializerContext<C extends ActionContext = ActionContext, D = unknown> =
  & C
  & { serializer: Serializer<D>; };

export type WithDeserializerContext<C extends ActionContext = ActionContext, D = unknown> =
  & C
  & { deserializer: Deserializer<D>; };

export type WithAdapterStack<C extends ActionContext = ActionContext, R = unknown, D = unknown> =
  & WithAdapterContext<C, R, D>
  & WithSerializerContext<C, D>
  & WithDeserializerContext<C, D>;
