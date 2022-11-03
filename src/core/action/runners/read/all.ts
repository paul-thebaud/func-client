import Action from '@/core/action/action';
import raw from '@/core/action/runners/raw';
import { ActionContext, ForSchemaContext, WithAdapterContext } from '@/core/action/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function all<C extends ActionContext, R, S extends ModelSchemaRaw>() {
  return async (a: Action<ForSchemaContext<C, S> & WithAdapterContext<C, R>>) => {
    const result = await a.run(raw());

    return a.context.adapter.deserializeMany(a.context, result) as Promise<ModelInstance<S>[]>;
  };
}
