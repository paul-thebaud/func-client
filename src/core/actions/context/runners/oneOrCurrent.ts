import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeInstance, ConsumeModel } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';

type OneOrCurrentContext<R, AD, I extends ModelInstance> =
  & ConsumeAdapter<R, AD>
  & ConsumeDeserializer<AD>
  & ConsumeModel
  & ConsumeInstance<I>;

export default function oneOrCurrent<R, AD, I extends ModelInstance>() {
  return (
    action: Action<OneOrCurrentContext<R, AD, I>>,
  ) => action.run(oneOr(async (a) => (await a.getContext()).instance)) as Promise<I>;
}
