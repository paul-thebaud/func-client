import Action from '@/core/actions/action';
import cachedOr from '@/core/actions/context/runners/cachedOr';
import { ConsumeCache, ConsumeId, ConsumeModel } from '@/core/actions/types';
import RunFailureError from '@/core/errors/runFailureError';
import { ModelDefinition } from '@/core/model/types';

export default function cachedOrFail<S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeCache & ConsumeId & ConsumeModel<S, I>>,
  ) => action.run(cachedOr(async (): Promise<never> => {
    throw new RunFailureError('`cachedOrFail` failed.');
  }));
}
