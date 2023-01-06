import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext, ConsumeModel } from '@/core/actions/types';
import { Model, ModelRelationDotKey } from '@/core/model/types';
import { ArrayableVariadic, uniqueValues, wrapVariadic } from '@/utilities';

export default function include<C extends ActionContext, M extends Model>(
  ...relations: ArrayableVariadic<ModelRelationDotKey<M>>
) {
  return async (
    action: Action<C & ConsumeModel<M>>,
  ) => action.use(context({
    includes: uniqueValues([
      ...((await action.context).includes ?? []),
      ...wrapVariadic(...relations),
    ]),
  }));
}
