import type Action from '@/core/actions/action';
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
  path?: string;
  params?: Dictionary<any> | string;
  payload?: unknown;
  [key: string]: unknown;
};

export type ActionEvent<C extends ActionContext> = { context: C; };
export type ActionRunningEvent<C extends ActionContext> = ActionEvent<C>;
export type ActionSuccessEvent<C extends ActionContext> = ActionEvent<C> & { result: unknown };
export type ActionErrorEvent<C extends ActionContext> = ActionEvent<C> & { error: unknown };
export type ActionFinallyEvent<C extends ActionContext> = ActionEvent<C>;

export type ActionHook<E> = (event: E) => Awaitable<void>;

export type ActionHooks<C extends ActionContext> = {
  onRunning: ActionHook<ActionRunningEvent<C>>[];
  onSuccess: ActionHook<ActionSuccessEvent<C>>[];
  onError: ActionHook<ActionErrorEvent<C>>[];
  onFinally: ActionHook<ActionFinallyEvent<C>>[];
};

export type ContextEnhancer<PC extends ActionContext, NC extends ActionContext> = (
  a: Action<PC>,
) => Awaitable<Action<NC> | void>;

export type ContextConsumer<C extends ActionContext, R> = (
  a: Action<C>,
) => Awaitable<R>;

export type ConsumeSchema<S extends ModelDefinition = ModelDefinition> = { schema: S; };

export type ConsumeModel<S extends ModelDefinition = ModelDefinition, I = ModelInstance<S>> =
  & ConsumeSchema<S>
  & { type: string; model: ModelClass<S> & Constructor<I>; };

export type ConsumeInstance<S extends ModelDefinition = ModelDefinition, I = ModelInstance<S>> =
  & ConsumeModel<S, I>
  & { instance: ModelInstance<S> & I; };

export type ConsumeId = { id: ModelId };

export type ConsumeCache = { cache: InstancesCacheI; };

export type ConsumeAdapter<R = unknown, D = unknown> = { adapter: AdapterI<R, D>; };

export type ConsumeDeserializer<D = unknown> = { deserializer: DeserializerI<D> };

export type ConsumeSerializer<D = unknown> = { serializer: SerializerI<D> };
