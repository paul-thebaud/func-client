import Action from '@/core/actions/action';
import dataUsing from '@/core/actions/context/consumers/dataUsing';
import toOneInstance from '@/core/actions/context/consumers/transformers/toOneInstance';
import {
  ActionContext,
  ConsumeAdapter,
  ConsumeDeserializer,
  ConsumeModel,
  ContextConsumer,
} from '@/core/actions/types';
import { ModelDefinition } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';
import { Awaitable } from '@/core/utilities/types';

export default function oneOrUsing<C extends ActionContext, R, D,
  S extends ModelDefinition, I, ND, DD>(
  transformData: (data: I, realData: D, context: C) => Awaitable<ND>,
  nilConsumer: ContextConsumer<C, DD>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(dataUsing(
    async (context, realData) => {
      const data = await toOneInstance(context, realData);
      if (isNil(data)) {
        return action.run(nilConsumer);
      }

      return transformData(data, realData, context);
    },
  ));
}
