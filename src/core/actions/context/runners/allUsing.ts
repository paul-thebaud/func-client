import Action from '@/core/actions/action';
import dataUsing from '@/core/actions/context/runners/dataUsing';
import toManyInstances from '@/core/actions/context/runners/transformers/toManyInstances';
import { ActionContext, ConsumeAdapter, ConsumeDeserializer, ConsumeModel } from '@/core/actions/types';
import { Model } from '@/core/model/types';
import { Awaitable } from '@/core/utilities/types';

export default function allUsing<C extends ActionContext, R, D, M extends Model, ND>(
  transformData: (data: InstanceType<M>[], realData: D, context: C) => Awaitable<ND>,
) {
  return (
    action: Action<C & ConsumeAdapter<R, D> & ConsumeDeserializer<D> & ConsumeModel<M>>,
  ) => action.run(
    dataUsing(async (context, realData) => transformData(
      await toManyInstances(context, realData),
      realData,
      context,
    )),
  );
}
