import Action from '@/core/actions/action';
import cachedOrUsing from '@/core/actions/context/runners/cachedOrUsing';
import { ActionContext, ConsumeCache, ConsumeId, ConsumeModel, ContextRunner } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function cachedOr<C extends ActionContext, S extends ModelDefinition, I, DD>(
  nilRunner: ContextRunner<C, DD>,
) {
  return async (
    action: Action<C & ConsumeCache & ConsumeId & ConsumeModel<S, I>>,
  ) => action.run(cachedOrUsing((d) => d, nilRunner));
}
