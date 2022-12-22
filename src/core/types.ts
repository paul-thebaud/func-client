import type { ActionContext } from '@/core/actions/types';
import type { Model, ModelId, ModelInstance } from '@/core/model/types';

export type RegistryI = {
  modelFor(type: string): Promise<Model>;
};

export type CacheI = {
  find(type: string, id: ModelId): Promise<ModelInstance | null>;
  put(type: string, id: ModelId, instance: ModelInstance): Promise<void>;
  forget(type: string, id: ModelId): Promise<void>;
  forgetAll(type: string): Promise<void>;
};

export type AdapterI<R, RD> = {
  action(context: ActionContext): Promise<R>;
  data(response: R): Promise<RD>;
  isNotFound(error: unknown): boolean;
};

export type SerializerI<D> = {
  serialize(context: ActionContext, instance: ModelInstance): Promise<D>;
};

export type DeserializerI<D> = {
  deserializeMany(context: ActionContext, data: D): Promise<ModelInstance[]>;
  deserializeOne(context: ActionContext, data: D): Promise<ModelInstance | null | undefined>;
};
