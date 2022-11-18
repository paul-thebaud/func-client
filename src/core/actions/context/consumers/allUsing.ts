import Action from '@/core/actions/action';
import dataUsing from '@/core/actions/context/consumers/dataUsing';
import toManyInstances from '@/core/actions/context/consumers/transformers/toManyInstances';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { ModelSchemaRaw } from '@/core/model/types';
import { Awaitable } from '@/core/utilities/types';

export default function allUsing<C extends ActionContext, R, D, S extends ModelSchemaRaw, I, ND>(
  transformData: (data: I[], realData: D, context: C) => Awaitable<ND>,
) {
  return async (
    action: Action<C & ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<S, I>>,
  ) => action.run(
    dataUsing(async (context, realData) => transformData(
      await toManyInstances(context, realData),
      realData,
      context,
    )),
  );
}
