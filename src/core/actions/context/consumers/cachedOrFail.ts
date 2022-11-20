import Action from '@/core/actions/action';
import cachedOr from '@/core/actions/context/consumers/cachedOr';
import toModelNotFoundError from '@/core/actions/context/consumers/transformers/toModelNotFoundError';
import { ConsumeCache, ConsumeId, ConsumeModel } from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function cachedOrFail<S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeCache & ConsumeId & ConsumeModel<S, I>>,
  ) => action.run(cachedOr(async (a) => toModelNotFoundError(await a.getContext())));
}
