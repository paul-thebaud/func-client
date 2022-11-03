import withId from '@/core/action/changers/action/withId';
import { ForSchemaContext } from '@/core/action/changers/forSchema';
import raw from '@/core/action/runners/raw';
import { WithAdapterResultContext } from '@/core/action/changers/withAdapter';
import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { ModelId, ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function find<C extends ActionContext, R, S extends ModelSchemaRaw>(
  id: ModelId,
) {
  return async (a: Action<ForSchemaContext<WithAdapterResultContext<C, R>, S>>) => {
    const result = await a.use(withId(id)).run(raw());

    return a.context.adapter.deserializeOne(a.context, result) as Promise<ModelInstance<S>>;
  };
}
