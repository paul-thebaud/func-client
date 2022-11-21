import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/consumers/oneOr';
import { ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import RunFailureError from '@/core/errors/runFailureError';
import { ModelDefinition } from '@/core/model/types';

export default function oneOrFail<R, D, S extends ModelDefinition, I>() {
  return (
    action: Action<ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(oneOr(async (): Promise<never> => {
    throw new RunFailureError('`oneOrFail` failed.');
  }));
}
