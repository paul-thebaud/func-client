import { WithSchemaContext } from '@/core/action/changers/forSchema';
import { WithAdapterResultContext } from '@/core/action/changers/useAdapter';
import { ActionContext } from '@/core/action/types';
import { ModelId, ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function find<C extends ActionContext, R, S extends ModelSchemaRaw>(
  id: ModelId,
) {
  return async (context: WithSchemaContext<WithAdapterResultContext<C, R>, S>) => {
    context.id = id;

    const result = await context.adapter.action(context);

    return context.adapter.deserializeOne(context, result) as Promise<ModelInstance<S>>;
  };
}
