import Action from '@/core/actions/action';
import data from '@/core/actions/context/consumers/data';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default function all<R, D, S extends ModelSchemaRaw, I>() {
  return async (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.context.deserializer.deserializeMany(
    action.context,
    await action.run(data()),
  ) as Promise<I[]>;
}
