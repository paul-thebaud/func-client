import Action from '@/core/actions/action';
import oneOrUsing from '@/core/actions/context/runners/oneOrUsing';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel, ContextRunner } from '@/core/actions/types';
import { Model } from '@/core/model/types';
import { DeserializedData } from '@/core/types';

export default function oneOr<
  C extends ActionContext,
  M extends Model,
  AD,
  DD extends DeserializedData,
  RD,
>(nilRunner: ContextRunner<C, RD>) {
  return (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD> & ConsumeModel<M>>,
  ) => action.run(oneOrUsing(({ instance }) => instance, nilRunner));
}
