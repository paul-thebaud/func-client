import Action from '@/core/actions/action';
import cachedOr from '@/core/actions/context/runners/cachedOr';
import { ConsumeCache, ConsumeModel } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function cached<S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeCache & ConsumeModel<S, I>>,
  ) => action.run(cachedOr(() => null));
}
