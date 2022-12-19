import Action from '@/core/actions/action';
import dataUsing from '@/core/actions/context/runners/dataUsing';
import toOneInstance from '@/core/actions/context/runners/transformers/toOneInstance';
import {
  ActionContext,
  ConsumeAdapter,
  ConsumeDeserializer,
  ContextRunner,
  ConsumeModel,
} from '@/core/actions/types';
import { Model } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';
import { Awaitable } from '@/core/utilities/types';

export default function oneOrUsing<C extends ActionContext, R, RD, M extends Model, ND, DD>(
  transformData: (data: InstanceType<M>, realData: RD, context: C) => Awaitable<ND>,
  nilRunner: ContextRunner<C, DD>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, RD> & ConsumeDeserializer<RD> & ConsumeModel<M>>,
  ) => {
    try {
      return await action.run(dataUsing(
        async (context, realData) => {
          const data = await toOneInstance(context, realData);
          if (isNil(data)) {
            return action.run(nilRunner);
          }

          return transformData(data, realData, context);
        },
      ));
    } catch (error) {
      if ((await action.getContext()).adapter.isNotFound(error)) {
        return action.run(nilRunner);
      }

      throw error;
    }
  };
}
