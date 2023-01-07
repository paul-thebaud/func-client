import useRequiredContext from '@/core/actions/context/consumers/useRequiredContext';
import { ActionContext, ConsumableContext } from '@/core/actions/types';

export default async function useIdContext(
  actionOrContext: ConsumableContext<ActionContext>,
) {
  return useRequiredContext(actionOrContext, 'id', [
    'find',
    'update',
    'destroy',
    'instance',
    'forId',
  ]);
}
