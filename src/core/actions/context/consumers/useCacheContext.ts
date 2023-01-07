import useRequiredContext from '@/core/actions/context/consumers/useRequiredContext';
import { ConsumableContext, ConsumeCache } from '@/core/actions/types';

export default async function useCacheContext(
  actionOrContext: ConsumableContext<ConsumeCache>,
) {
  return useRequiredContext(actionOrContext, 'cache', ['withCache']);
}
