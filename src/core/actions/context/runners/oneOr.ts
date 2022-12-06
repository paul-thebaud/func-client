import Action from '@/core/actions/action';
import oneOrUsing from '@/core/actions/context/runners/oneOrUsing';
import {
  ActionContext,
  ConsumeAdapter,
  ConsumeDeserializer,
  ConsumeModel,
  ContextRunner,
} from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';

export default function oneOr<C extends ActionContext, R, D, S extends ModelDefinition, I, DD>(
  nilRunner: ContextRunner<C, DD>,
) {
  return (
    action: Action<C & ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(oneOrUsing((d) => d, nilRunner));
}
