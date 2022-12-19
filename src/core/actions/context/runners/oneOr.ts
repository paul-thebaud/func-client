import Action from '@/core/actions/action';
import oneOrUsing from '@/core/actions/context/runners/oneOrUsing';
import {
  ActionContext,
  ConsumeAdapter,
  ConsumeDeserializer,
  ContextRunner,
  ConsumeModel,
} from '@/core/actions/types';
import { Model } from '@/core/model/types';

export default function oneOr<C extends ActionContext, R, RD, M extends Model, DD>(
  nilRunner: ContextRunner<C, DD>,
) {
  return (
    action: Action<C & ConsumeAdapter<R, RD> & ConsumeDeserializer<RD> & ConsumeModel<M>>,
  ) => action.run(oneOrUsing((d) => d, nilRunner));
}
