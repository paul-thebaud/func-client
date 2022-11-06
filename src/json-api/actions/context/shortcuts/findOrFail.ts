import { Action, one, withAction } from '@/core/actions';
import { ActionContext, ForModelContext, WithAdapterContext, WithDeserializerContext } from '@/core/actions/types';
import AdapterError from '@/core/errors/adapterError';
import { ModelId, ModelSchemaRaw } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';

export default function findOrFail<C extends ActionContext, R, D, S extends ModelSchemaRaw, I>(
  id: ModelId,
) {
  return async (
    a: Action<ForModelContext<WithDeserializerContext<WithAdapterContext<C, R, D>, D>, S, I>>,
  ) => {
    const instance = await a.use(withAction({ id })).run(one());
    if (isNil(instance)) {
      throw new AdapterError('Adapter call with findOrFail should not return an empty body response');
    }

    return instance;
  };
}
