import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function one<R, D, S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(oneOr(() => null));
}
