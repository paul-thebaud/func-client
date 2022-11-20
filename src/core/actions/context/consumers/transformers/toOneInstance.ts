import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function toOneInstance<D, S extends ModelDefinition, I>(
  context: ConsumeAdapter & ConsumeDeserializer<D> & ConsumeModel<S, I>,
  data: D,
) {
  return context.deserializer.deserializeOne(
    context,
    data,
  ) as Promise<I | null | undefined>;
}
