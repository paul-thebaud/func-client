import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import {
  ActionContext,
  ConsumeAdapter,
  ConsumeDeserializer,
  ConsumeInstance,
  ConsumeModel,
} from '@/core/actions/types';
import { Model } from '@/core/model/types';
import { DeserializedData } from '@/core/types';

type OneOrCurrentContext<
  M extends Model,
  I extends InstanceType<M>,
  AD,
  DD extends DeserializedData,
> =
  & ConsumeAdapter<AD>
  & ConsumeDeserializer<AD, DD>
  & ConsumeModel<M>
  & ConsumeInstance<I>;

export default function oneOrCurrent<
  C extends ActionContext,
  M extends Model,
  I extends InstanceType<M>,
  AD,
  DD extends DeserializedData,
>() {
  return (
    action: Action<C & OneOrCurrentContext<M, I, AD, DD>>,
  ) => action.run(oneOr(async (a) => (await a.context).instance));
}
