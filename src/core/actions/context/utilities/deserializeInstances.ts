import Action from '@/core/actions/action';
import useContext from '@/core/actions/context/consumers/useContext';
import useDeserializerContext from '@/core/actions/context/consumers/useDeserializerContext';
import { ConsumeDeserializer } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';
import { DeserializedData } from '@/core/types';

export type DeserializedDataOf<I extends ModelInstance, DD extends DeserializedData> = {
  instances: I[];
} & Omit<DD, 'instances'>;

export default async function deserializeInstances<
  I extends ModelInstance, AD, DD extends DeserializedData,
>(action: Action<ConsumeDeserializer<AD, DD>>, data: AD) {
  const deserializer = await useDeserializerContext(action);

  return deserializer.deserialize(
    data,
    await useContext(action),
  ) as Promise<DeserializedDataOf<I, DD>>;
}
