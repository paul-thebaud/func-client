import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext, ConsumeModel } from '@/core/actions/types';
import { Model, ModelRelationDotKey } from '@/core/model/types';
import { Arrayable } from '@/core/utilities/types';
import uniqueValues from '@/core/utilities/uniqueValues';
import wrap from '@/core/utilities/wrap';

export default function include<C extends ActionContext, M extends Model>(
  relations: Arrayable<ModelRelationDotKey<M>>,
) {
  return async (
    action: Action<C & ConsumeModel<M>>,
  ) => action.use(context({
    includes: uniqueValues([
      ...((await action.getContext()).includes ?? []),
      ...wrap(relations),
    ]),
  }));
}
