import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';

export default async function toOneInstance<D, S extends ModelSchemaRaw, I>(
  context: ConsumeAdapter & ConsumeDeserializer<D> & ConsumeModel<S, I>,
  data: D,
) {
  return context.deserializer.deserializeOne(
    context,
    data,
  ) as Promise<I | null | undefined>;
}
