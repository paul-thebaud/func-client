import Action from '@/core/actions/action';
import deserializeInstances, { DeserializedDataOf } from '@/core/actions/context/utilities/deserializeInstances';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';
import { DeserializedData } from '@/core/types';
import { Awaitable } from '@/utilities';
import raw from './raw';

export default function allUsing<
  C extends ActionContext,
  M extends Model,
  I extends InstanceType<M>,
  AD,
  DD extends DeserializedData,
  ND,
>(
  using: (data: { context: C; data: DeserializedDataOf<I, DD>; instances: I[]; }) => Awaitable<ND>,
) {
  return async (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD> & ConsumeModel<M>>,
  ) => {
    const rawData = await action.run(raw());
    const data = await deserializeInstances<I, AD, DD>(action, rawData);
    const { instances } = data;

    return using({ context: await action.context, data, instances });
  };
}
