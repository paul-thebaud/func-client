import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext, ConsumeDefinition } from '@/core/actions/types';
import { ModelDefinition, ModelRelationDotKey } from '@/core/model/types';
import wrap from '@/core/utilities/wrap';
import { Arrayable } from '@/core/utilities/types';
import uniqueValues from '@/core/utilities/uniqueValues';

export default function include<C extends ActionContext, D extends ModelDefinition>(
  relations: Arrayable<ModelRelationDotKey<D>>,
) {
  return async (
    action: Action<C & ConsumeDefinition<D>>,
  ) => action.use(context({
    includes: uniqueValues([
      ...((await action.getContext()).includes ?? []),
      ...wrap(relations),
    ]),
  }));
}
