import type Action from '@/core/actions/action';
import { HookCallback } from '@/core/hooks/types';
import { Model, ModelId, ModelInstance } from '@/core/model/types';
import { AdapterI, DeserializerI, CacheI, SerializerI } from '@/core/types';
import { Awaitable, Dictionary } from '@/core/utilities/types';

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
  // TODO Remove "method", replace with "action".
  method?: ActionMethod;
  // TODO Remove "baseURL".
  baseURL?: string;
  type?: string;
  id?: ModelId;
  relation?: string;
  includes?: string[];
  // TODO Remove "path".
  path?: string;
  // TODO Remove "params"?
  params?: Dictionary<any> | string;
  // TODO Remove "payload", replace with "data"?
  payload?: unknown;
  [K: string]: unknown;
};

export type ActionHooksDefinition<C extends ActionContext = any> = {
  preparing: HookCallback<undefined>;
  running: HookCallback<{ context: C; }>;
  success: HookCallback<{ context: C; result: unknown; }>;
  error: HookCallback<{ context: C; error: unknown; }>;
  finally: HookCallback<{ context: C; }>;
};

export type ContextEnhancer<PC extends ActionContext, NC extends ActionContext> = (
  a: Action<PC>,
) => Awaitable<Action<NC> | void>;

export type ContextRunner<C extends ActionContext, R> = (
  a: Action<C>,
) => R;

export type ConsumeModel<M extends Model = Model> = {
  model: M;
};

export type ConsumeInstance<I extends ModelInstance = ModelInstance> = {
  instance: I;
};

export type ConsumeCache = { cache: CacheI; };

export type ConsumeAdapter<R = unknown, RD = unknown> = { adapter: AdapterI<R, RD>; };

export type ConsumeDeserializer<D = unknown> = { deserializer: DeserializerI<D> };

export type ConsumeSerializer<D = unknown> = { serializer: SerializerI<D> };
