import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function one<R, RD, M extends Model>() {
  return (
    action: Action<ConsumeAdapter<R, RD> & ConsumeDeserializer<RD> & ConsumeModel<M>>,
  ) => action.run(oneOr(() => null));
}
