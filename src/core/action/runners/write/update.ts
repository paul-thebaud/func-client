import Action from '@/core/action/action';
import withId from '@/core/action/changers/action/withId';
import withMethod from '@/core/action/changers/action/withMethod';
import withPayload from '@/core/action/changers/action/withPayload';
import withType from '@/core/action/changers/action/withType';
import { WithAdapterResultContext } from '@/core/action/changers/withAdapter';
import raw from '@/core/action/runners/raw';
import { ActionContext } from '@/core/action/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function update<C extends ActionContext, R, S extends ModelSchemaRaw>(
  model: ModelInstance<S>,
) {
  return async (a: Action<WithAdapterResultContext<C, R>>) => {
    const result = await a
      .use(withMethod('PATCH'))
      .use(withType(model.constructor.$type))
      .use(withId(model.id))
      .use(withPayload(await a.context.adapter.serializeOne(a.context, model)))
      .run(raw());

    return a.context.adapter.deserializeOne(a.context, result) as Promise<ModelInstance<S>>;
  };
}
