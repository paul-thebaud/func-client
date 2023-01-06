import Action from '@/core/actions/action';
import raw from '@/core/actions/context/runners/raw';
import deserializeInstances, { DeserializedDataOf } from '@/core/actions/context/utilities/deserializeInstances';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel, ContextRunner } from '@/core/actions/types';
import { Model } from '@/core/model/types';
import { DeserializedData } from '@/core/types';
import { Awaitable } from '@/utilities';

export default function oneOrUsing<
  C extends ActionContext,
  M extends Model,
  I extends InstanceType<M>,
  AD,
  DD extends DeserializedData,
  ND,
  RD,
>(
  using: (data: { context: C; data: DeserializedDataOf<I, DD>; instance: I; }) => Awaitable<ND>,
  nilRunner: ContextRunner<C, RD>,
) {
  return async (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD> & ConsumeModel<M>>,
  ) => {
    try {
      const rawData = await action.run(raw());
      const data = await deserializeInstances<I, AD, DD>(action, rawData);
      const { instances } = data;
      if (instances.length === 0) {
        return await action.run(nilRunner);
      }

      return await using({ context: await action.context, data, instance: instances[0] });
    } catch (error) {
      if (await (await action.context).adapter.isNotFound(error)) {
        return action.run(nilRunner);
      }

      throw error;
    }
  };
}
