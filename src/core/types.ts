import type { ActionContext } from '@/core/actions/types';
import type { ModelInstance } from '@/core/model/types';

export type Adapter<R, D> = {
  action(context: ActionContext): Promise<R>;
  data(result: R): Promise<D>;
};

export type Serializer<D> = {
  serializeOne(context: ActionContext, model: ModelInstance): Promise<D>;
  serializeMany(context: ActionContext, models: ModelInstance[]): Promise<D>;
};

export type Deserializer<D> = {
  deserializeOne(context: ActionContext, data: D): Promise<ModelInstance | null | undefined>;
  deserializeMany(context: ActionContext, data: D): Promise<ModelInstance[]>;
};
