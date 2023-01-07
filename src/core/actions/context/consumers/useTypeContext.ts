import useRequiredContext from '@/core/actions/context/consumers/useRequiredContext';
import { ActionContext, ConsumableContext } from '@/core/actions/types';

export default async function useTypeContext(
  actionOrContext: ConsumableContext<ActionContext>,
) {
  return useRequiredContext(actionOrContext, 'type', [
    'model',
    'find',
    'update',
    'destroy',
    'instance',
  ]);
}
