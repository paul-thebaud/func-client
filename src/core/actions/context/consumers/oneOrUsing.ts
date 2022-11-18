import Action from '@/core/actions/action';
import dataUsing from '@/core/actions/context/consumers/dataUsing';
import toOneInstance from '@/core/actions/context/consumers/transformers/toOneInstance';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';
import { Awaitable } from '@/core/utilities/types';

export default function oneOrUsing<C extends ActionContext, R, D,
  S extends ModelSchemaRaw, I, ND, DD>(
  transformData: (data: I | DD, realData: D, context: C) => Awaitable<ND>,
  defaultData: (realData: D, context: C) => Awaitable<DD>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(dataUsing(
    async (context, realData) => {
      const data = await toOneInstance(context, realData);
      if (isNil(data)) {
        return defaultData(realData, context);
      }

      return transformData(data, realData, context);
    },
  ));
}
