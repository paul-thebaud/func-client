import { ModelId, ModelInstance } from '@/core/model/types';
import { Dictionary } from '@/core/utilities/types';

export type ActionContext = {
  base?: string;
  type?: string;
  id?: ModelId;
  relation?: string;
  path?: string;
  params?: Dictionary;
  payload?: unknown;
  options?: Dictionary;
};

export type Adapter<R> = {
  action(context: ActionContext): Promise<R>;
  deserializeOne(
    context: ActionContext,
    result: R,
  ): Promise<ModelInstance>;
  deserializeMany(
    context: ActionContext,
    result: R,
  ): Promise<ModelInstance[]>;
};
