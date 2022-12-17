import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function toOneInstance<D, M extends Model>(
  context: ConsumeAdapter & ConsumeDeserializer<D> & ConsumeModel<M>,
  data: D,
) {
  return context.deserializer.deserializeOne(
    context,
    data,
  ) as Promise<InstanceType<M> | null | undefined>;
}
