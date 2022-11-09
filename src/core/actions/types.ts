import type Action from '@/core/actions/action';
import { ModelClass, ModelId, ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import { Adapter, Deserializer, Serializer } from '@/core/types';
import { Constructor, Dictionary } from '@/core/utilities/types';

// TODO How could we type hooks from other package?
export type ActionHooks = {} & Dictionary<(param: any) => any>;

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
  hooks?: Partial<ActionHooks>;
  method?: ActionMethod;
  baseURL?: string;
  type?: string;
  id?: ModelId;
  relation?: string;
  path?: string;
  params?: Dictionary<any>;
  payload?: unknown;
  [key: string]: unknown;
};

export type ContextEnhancer<PC extends ActionContext = {}, NC extends ActionContext = {}> = (
  a: Action<PC>,
) => Action<NC> | Promise<Action<NC>>;

export type ContextConsumer<C extends ActionContext = {}, R = unknown> = (
  a: Action<C>,
) => R;

export type ConsumeSchema<S extends ModelSchemaRaw = ModelSchemaRaw> = { schema: S; };

export type ConsumeModel<S extends ModelSchemaRaw = ModelSchemaRaw, I = ModelInstance<S>> =
  & ConsumeSchema<S>
  & { type: string; model: ModelClass<S> & Constructor<I>; };

export type ConsumeInstance<S extends ModelSchemaRaw = ModelSchemaRaw, I = ModelInstance<S>> =
  & ConsumeModel<S, I>
  & { instance: ModelInstance<S> & I; };

export type ConsumeId = { id: ModelId };

export type ConsumeAdapter<R = unknown, D = unknown> = { adapter: Adapter<R, D>; };

export type ConsumeDeserializer<D = unknown> = { deserializer: Deserializer<D> };

export type ConsumeSerializer<D = unknown> = { serializer: Serializer<D> };
