import Action from '@/core/actions/action';
import allUsing from '@/core/actions/context/runners/allUsing';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function all<R, D, S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(allUsing((d) => d));
}
