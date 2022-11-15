import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/consumers/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeInstance } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default function oneOrCurrent<R, D, S extends ModelSchemaRaw, I>() {
  return async (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeInstance<S, I>>,
  ) => action.run(oneOr((context) => context.instance as I));
}
