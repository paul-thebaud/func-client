import useRequiredContext from '@/core/actions/context/consumers/useRequiredContext';
import { ConsumableContext, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default async function useModelContext<M extends Model>(
  actionOrContext: ConsumableContext<ConsumeModel<M>>,
) {
  return useRequiredContext(actionOrContext, 'model', [
    'model',
    'find',
    'update',
    'destroy',
    'instance',
    'target',
  ]);
}
