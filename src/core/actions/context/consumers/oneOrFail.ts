import Action from '@/core/actions/action';
import one from '@/core/actions/context/consumers/one';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeId, ConsumeModel } from '@/core/actions/types';
import ModelNotFoundError from '@/core/errors/modelNotFoundError';
import { ModelSchemaRaw } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';

function throwModelNotFound<S extends ModelSchemaRaw, I>(
  context: ConsumeModel<S, I> & Partial<ConsumeId>,
): never {
  throw new ModelNotFoundError(context.type, context.id);
}

export default function oneOrFail<R, D, S extends ModelSchemaRaw, I>() {
  return async (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => {
    let result;
    try {
      result = await action.run(one());
    } catch (error) {
      if (action.context.adapter.isNotFound(error)) {
        throwModelNotFound(action.context);
      }

      throw error;
    }

    if (isNil(result)) {
      throwModelNotFound(action.context);
    }

    return result;
  };
}
