import { ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function toManyInstances<D, M extends Model>(
  context: ConsumeDeserializer<D> & ConsumeModel<M>,
  data: D,
) {
  return context.deserializer.deserializeMany(
    context,
    data,
  ) as Promise<InstanceType<M>[]>;
}
