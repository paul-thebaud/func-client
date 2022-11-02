import raw from '@/core/action/changers/runners/raw';
import { WithAdapterResultContext } from '@/core/action/changers/useAdapter';
import { ActionContext } from '@/core/action/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function create<C extends ActionContext, R, S extends ModelSchemaRaw>(
  model: ModelInstance<S>,
) {
  return async (context: WithAdapterResultContext<C, R>) => {
    const result = await raw((c) => ({
      ...c,
      method: 'POST',
      type: model.constructor.$type,
      // TODO Compute body.
    }))(context);

    return context.adapter.deserializeOne(context, result) as Promise<ModelInstance<S>>;
  };
}
