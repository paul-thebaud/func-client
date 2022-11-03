import { ForSchemaContext } from '@/core/action/changers/forSchema';
import raw from '@/core/action/runners/raw';
import { WithAdapterResultContext } from '@/core/action/changers/withAdapter';
import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function all<C extends ActionContext, R, S extends ModelSchemaRaw>() {
  return async (a: Action<ForSchemaContext<WithAdapterResultContext<C, R>, S>>) => {
    const result = await a.run(raw());

    return a.context.adapter.deserializeMany(a.context, result) as Promise<ModelInstance<S>[]>;
  };
}
