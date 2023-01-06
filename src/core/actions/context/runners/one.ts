import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';
import { DeserializedData } from '@/core/types';

export default function one<
  C extends ActionContext,
  M extends Model,
  AD,
  DD extends DeserializedData,
>() {
  return (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD> & ConsumeModel<M>>,
  ) => action.run(oneOr(() => null));
}
