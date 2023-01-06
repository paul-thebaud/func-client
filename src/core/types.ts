import type { ActionContext } from '@/core/actions/types';
import type { Model, ModelId, ModelInstance } from '@/core/model/types';
import { Awaitable } from '@/utilities';

export type RegistryI = {
  modelFor(type: string): Promise<Model>;
};

export type CacheI = {
  find(type: string, id: ModelId): Promise<ModelInstance | null>;
  put(type: string, id: ModelId, instance: ModelInstance): Promise<void>;
  forget(type: string, id: ModelId): Promise<void>;
  forgetAll(type: string): Promise<void>;
};

export type NewAdapterI<Data> = {
  execute(context: ActionContext): Awaitable<Data>;
  isNotFound(error: unknown): Awaitable<boolean>;
};

export type NewSerializerI<Data> = {
  serialize(instance: ModelInstance, context: ActionContext): Awaitable<Data>;
};

export type DeserializedData<I extends ModelInstance = ModelInstance> = {
  instances: I[];
};

export type NewDeserializerI<AdapterData, Data extends DeserializedData> = {
  deserialize(data: AdapterData, context: ActionContext): Awaitable<Data>;
};
