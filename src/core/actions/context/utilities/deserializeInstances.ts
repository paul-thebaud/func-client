import Action from '@/core/actions/action';
import { ConsumeDeserializer } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';
import { DeserializedData } from '@/core/types';

export type DeserializedDataOf<I extends ModelInstance, DD extends DeserializedData> = {
  instances: I[];
} & Omit<DD, 'instances'>;

export default async function deserializeInstances<
  I extends ModelInstance, AD, DD extends DeserializedData,
>(action: Action<ConsumeDeserializer<AD, DD>>, data: AD) {
  return (await action.context).deserializer.deserialize(
    data,
    await action.context,
  ) as DeserializedDataOf<I, DD>;
}
