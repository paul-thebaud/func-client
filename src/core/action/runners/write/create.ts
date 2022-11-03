import Action from '@/core/action/action';
import withMethod from '@/core/action/changers/action/withMethod';
import withPayload from '@/core/action/changers/action/withPayload';
import withType from '@/core/action/changers/action/withType';
import raw from '@/core/action/runners/raw';
import { ActionContext, WithAdapterContext } from '@/core/action/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function create<C extends ActionContext, R, S extends ModelSchemaRaw>(
  model: ModelInstance<S>,
) {
  return async (a: Action<WithAdapterContext<C, R>>) => {
    const result = await a
      .use(withMethod('POST'))
      .use(withType(model.constructor.$type))
      .use(withPayload(await a.context.adapter.serializeOne(a.context, model)))
      .run(raw());

    return a.context.adapter.deserializeOne(a.context, result) as Promise<ModelInstance<S>>;
  };
}
