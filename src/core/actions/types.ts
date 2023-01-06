import type Action from '@/core/actions/action';
import { HookCallback } from '@/core/hooks/types';
import { Model, ModelId, ModelInstance } from '@/core/model/types';
import { CacheI, DeserializedData, AdapterI, DeserializerI, SerializerI, RegistryI } from '@/core/types';
import { Awaitable } from '@/utilities';

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
  action?: 'READ' | 'CREATE' | 'UPDATE' | 'DESTROY';
  type?: string;
  id?: ModelId;
  relation?: string;
  includes?: string[];
  data?: unknown;
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
  action: Action<PC>,
) => Awaitable<Action<NC> | void>;

export type ContextRunner<C extends ActionContext, R> = (
  action: Action<C>,
) => R;

export type ConsumeModel<M extends Model = Model> = {
  model: M;
};

export type ConsumeInstance<I extends ModelInstance = ModelInstance> = {
  instance: I;
};

export type ConsumeCache = { cache: CacheI; };

export type ConsumeRegistry = { registry: RegistryI; };

export type ConsumeAdapter<Data = unknown> = {
  adapter: AdapterI<Data>;
};

export type ConsumeDeserializer<
  AdapterData = unknown,
  Data extends DeserializedData = DeserializedData,
> = {
  deserializer: DeserializerI<AdapterData, Data>;
};

export type ConsumeSerializer<Data = unknown> = {
  serializer: SerializerI<Data>;
};
