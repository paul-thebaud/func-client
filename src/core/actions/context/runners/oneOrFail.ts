import Action from '@/core/actions/action';
import oneOr from '@/core/actions/context/runners/oneOr';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import ExpectedRunFailureError from '@/core/errors/expectedRunFailureError';
import { Model } from '@/core/model/types';
import { DeserializedData } from '@/core/types';

export default function oneOrFail<
  C extends ActionContext,
  M extends Model,
  AD,
  DD extends DeserializedData,
>() {
  return (
    action: Action<C & ConsumeAdapter<AD> & ConsumeDeserializer<AD, DD> & ConsumeModel<M>>,
  ) => action.run(oneOr(async (): Promise<never> => {
    throw new ExpectedRunFailureError(
      '`oneOrFail` failed. You may globally handle this error as a "not found" record.',
    );
  }));
}
