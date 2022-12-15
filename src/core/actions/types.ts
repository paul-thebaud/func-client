import type Action from '@/core/actions/action';
import { HookCallback } from '@/core/hooks/types';
import { ModelClass, ModelDefinition, ModelId, ModelInstance } from '@/core/model/types';
import { AdapterI, DeserializerI, InstancesCacheI, SerializerI } from '@/core/types';
import { Awaitable, Constructor, Dictionary } from '@/core/utilities/types';

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
  includes?: string[];
  path?: string;
  params?: Dictionary<any> | string;
  payload?: unknown;
  [key: string]: unknown;
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

export type ConsumeDefinition<D extends ModelDefinition = ModelDefinition> = { schema: D; };

export type ConsumeModel<D extends ModelDefinition = ModelDefinition, I = ModelInstance<D>> =
  & ConsumeDefinition<D>
  & { type: string; model: ModelClass<D> & Constructor<I>; };

export type ConsumeInstance<S extends ModelDefinition = ModelDefinition, I = ModelInstance<S>> =
  & ConsumeModel<S, I>
  & { instance: ModelInstance<S> & I; };

export type ConsumeCache = { cache: InstancesCacheI; };

export type ConsumeAdapter<R = unknown, D = unknown> = { adapter: AdapterI<R, D>; };

export type ConsumeDeserializer<D = unknown> = { deserializer: DeserializerI<D> };

export type ConsumeSerializer<D = unknown> = { serializer: SerializerI<D> };
