import { WithSchemaContext } from '@/core/action/changers/forSchema';
import raw from '@/core/action/changers/runners/raw';
import { WithAdapterResultContext } from '@/core/action/changers/useAdapter';
import { ActionContext } from '@/core/action/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function all<C extends ActionContext, R, S extends ModelSchemaRaw>() {
  return async (context: WithSchemaContext<WithAdapterResultContext<C, R>, S>) => {
    const result = await raw()(context);

    return context.adapter.deserializeMany(context, result) as Promise<ModelInstance<S>[]>;
  };
}
