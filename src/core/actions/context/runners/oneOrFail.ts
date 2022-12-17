import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import RunFailureError from '@/core/errors/runFailureError';
import { Model } from '@/core/model/types';

export default function oneOrFail<R, D, M extends Model>() {
  return (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<M>>,
  ) => action.run(oneOr(async (): Promise<never> => {
    throw new RunFailureError('`oneOrFail` failed.');
  }));
}
