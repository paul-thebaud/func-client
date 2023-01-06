import Action from '@/core/actions/action';
import deserializedData from '@/core/actions/context/runners/deserializedData';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer } from '@/core/actions/types';
import { DeserializedData } from '@/core/types';
import { Awaitable } from '@/utilities';

export default function deserializedDataUsing<
  C extends ActionContext, AD, DD extends DeserializedData, ND,
>(using: (data: { context: C; data: DD; }) => Awaitable<ND>) {
  return async (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD>>,
  ) => using({
    context: await action.context,
    data: await action.run(deserializedData()),
  });
}
