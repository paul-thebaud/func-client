import { Action } from '@/core/actions';
import { ActionContext, ForModelContext, WithAdapterContext, WithDeserializerContext } from '@/core/actions/types';
import { ModelId, ModelSchemaRaw } from '@/core/model/types';
import findOrFail from '@/json-api/actions/context/shortcuts/findOrFail';
import NotFoundError from '@/json-api/adapter/errors/notFoundError';

export default function find<C extends ActionContext, R, D, S extends ModelSchemaRaw, I>(
  id: ModelId,
) {
  return async (
    a: Action<ForModelContext<WithDeserializerContext<WithAdapterContext<C, R, D>, D>, S, I>>,
  ) => {
    try {
      return await a.run(findOrFail(id));
    } catch (error) {
      if (error instanceof NotFoundError) {
        return null;
      }

      throw error;
    }
  };
}
