import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import ExpectedRunFailureError from '@/core/errors/expectedRunFailureError';
import { Model } from '@/core/model/types';

export default function oneOrFail<R, RD, M extends Model>() {
  return (
    action: Action<ConsumeAdapter<R, RD> & ConsumeDeserializer<RD> & ConsumeModel<M>>,
  ) => action.run(oneOr(async (): Promise<never> => {
    throw new ExpectedRunFailureError('`oneOrFail` failed.');
  }));
}
