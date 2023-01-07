import useRequiredContext from '@/core/actions/context/consumers/useRequiredContext';
import { ConsumableContext, ConsumeAdapter } from '@/core/actions/types';

export default async function useAdapterContext<AD>(
  actionOrContext: ConsumableContext<ConsumeAdapter<AD>>,
) {
  return useRequiredContext(actionOrContext, 'adapter', ['withAdapter']);
}
