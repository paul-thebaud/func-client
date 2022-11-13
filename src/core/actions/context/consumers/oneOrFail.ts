import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/consumers/oneOr';
import toModelNotFoundError from '@/core/actions/context/consumers/transformers/toModelNotFoundError';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default function oneOrFail<R, D, S extends ModelSchemaRaw, I>() {
  return async (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(oneOr((context) => toModelNotFoundError(context)));
}
