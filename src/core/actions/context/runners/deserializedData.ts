import Action from '@/core/actions/action';
import raw from '@/core/actions/context/runners/raw';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer } from '@/core/actions/types';
import { DeserializedData } from '@/core/types';

export default function deserializedData<
  C extends ActionContext, AD, DD extends DeserializedData,
>() {
  return async (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD>>,
  ) => (await action.context).deserializer.deserialize(
    await action.run(raw()),
    await action.context,
  );
}
