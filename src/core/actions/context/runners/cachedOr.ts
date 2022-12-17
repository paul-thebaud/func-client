import Action from '@/core/actions/action';
import cachedOrUsing from '@/core/actions/context/runners/cachedOrUsing';
import { ActionContext, ConsumeCache, ContextRunner, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function cachedOr<C extends ActionContext, M extends Model, DD>(
  nilRunner: ContextRunner<C, DD>,
) {
  return async (
    action: Action<C & ConsumeCache & ConsumeModel<M>>,
  ) => action.run(cachedOrUsing((d) => d, nilRunner));
}
