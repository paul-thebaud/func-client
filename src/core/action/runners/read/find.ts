import Action from '@/core/action/action';
import withId from '@/core/action/changers/action/withId';
import raw from '@/core/action/runners/raw';
import { ActionContext, ForSchemaContext, WithAdapterContext } from '@/core/action/types';
import { ModelId, ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function find<C extends ActionContext, R, S extends ModelSchemaRaw>(
  id: ModelId,
) {
  return async (a: Action<ForSchemaContext<C, S> & WithAdapterContext<C, R>>) => {
    const result = await a.use(withId(id)).run(raw());

    return a.context.adapter.deserializeOne(a.context, result) as Promise<ModelInstance<S>>;
  };
}
