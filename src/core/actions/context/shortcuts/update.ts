import Action from '@/core/actions/action';
import forInstance from '@/core/actions/context/changers/forInstance';
import withAction from '@/core/actions/context/changers/withAction';
import one from '@/core/actions/context/runners/one';
import { ActionContext, ForInstanceContext, WithAdapterStack } from '@/core/actions/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';

export default function update<C extends ActionContext, R, D,
  S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
  prepare?: <FC extends ForInstanceContext<WithAdapterStack<C, R, D>, S, ModelInstance<S> & I>>(
    a: Action<FC>,
  ) => Action<FC>,
) {
  return async (
    a: Action<WithAdapterStack<C, R, D>>,
  ) => {
    const preparedAction = a
      .use(forInstance<WithAdapterStack<C, R, D>, S, ModelInstance<S> & I>(instance))
      .use(withAction({
        method: 'PATCH',
        id: instance.id,
        payload: await a.context.serializer.serializeOne(a.context, instance),
      }));

    const finalAction = prepare ? prepare(preparedAction) : preparedAction;

    const result = await finalAction.run(one());

    if (isNil(result)) {
      return instance;
    }

    return result as I;
  };
}
