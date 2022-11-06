import Action from '@/core/actions/action';
import data from '@/core/actions/context/runners/data';
import { ActionContext, ForModelContext, WithAdapterContext, WithDeserializerContext } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';

export default function one<C extends ActionContext, R, D, S extends ModelSchemaRaw, I>() {
  return async (
    a: Action<ForModelContext<WithDeserializerContext<WithAdapterContext<C, R, D>, D>, S, I>>,
  ) => {
    const result = await a.run(data());
    if (isNil(result)) {
      return result;
    }

    return a.context.deserializer.deserializeOne(a.context, result) as Promise<I>;
  };
}
