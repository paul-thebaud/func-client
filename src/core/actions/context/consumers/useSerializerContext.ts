import useRequiredContext from '@/core/actions/context/consumers/useRequiredContext';
import { ConsumableContext, ConsumeSerializer } from '@/core/actions/types';

export default async function useSerializerContext<SD>(
  actionOrContext: ConsumableContext<ConsumeSerializer<SD>>,
) {
  return useRequiredContext(actionOrContext, 'serializer', ['withSerializer']);
}
