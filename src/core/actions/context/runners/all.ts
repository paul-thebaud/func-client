import Action from '@/core/actions/action';
import allUsing from '@/core/actions/context/runners/allUsing';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function all<R, RD, M extends Model>() {
  return (
    action: Action<ConsumeAdapter<R, RD> & ConsumeDeserializer<RD> & ConsumeModel<M>>,
  ) => action.run(allUsing((d) => d));
}
