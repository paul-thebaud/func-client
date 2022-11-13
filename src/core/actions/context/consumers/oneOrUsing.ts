import Action from '@/core/actions/action';
import dataUsing from '@/core/actions/context/consumers/dataUsing';
import toOneInstance from '@/core/actions/context/consumers/transformers/toOneInstance';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';

export default function oneOrUsing<C extends ActionContext, R, D,
  S extends ModelSchemaRaw, I, ND, DD>(
  transformData: (data: I | DD, realData: D, context: C) => ND | Promise<ND>,
  defaultData: (context: C, realData: D) => DD | Promise<DD>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(dataUsing(
    async (context, realData) => {
      const data = await toOneInstance(context, realData);
      if (isNil(data)) {
        return defaultData(context, realData);
      }

      return transformData(data, realData, context);
    },
  ));
}
