import Action from '@/core/actions/action';
import cachedOr from '@/core/actions/context/runners/cachedOr';
import { ConsumeCache, ConsumeModel } from '@/core/actions/types';
import ExpectedRunFailureError from '@/core/errors/expectedRunFailureError';
import { Model } from '@/core/model/types';

export default function cachedOrFail<M extends Model>() {
  return (
    action: Action<ConsumeCache & ConsumeModel<M>>,
  ) => action.run(cachedOr(async (): Promise<never> => {
    throw new ExpectedRunFailureError('`cachedOrFail` failed.');
  }));
}
