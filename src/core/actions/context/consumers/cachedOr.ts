import Action from '@/core/actions/action';
import cachedOrUsing from '@/core/actions/context/consumers/cachedOrUsing';
import { ActionContext, ConsumeCache, ConsumeId, ConsumeModel, ContextConsumer } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function cachedOr<C extends ActionContext, S extends ModelDefinition, I, DD>(
  nilConsumer: ContextConsumer<C, DD>,
) {
  return async (
    action: Action<C & ConsumeCache & ConsumeId & ConsumeModel<S, I>>,
  ) => action.run(cachedOrUsing((d) => d, nilConsumer));
}
