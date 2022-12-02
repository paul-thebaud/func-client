import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext, ConsumeSchema } from '@/core/actions/types';
import { ModelDefinition, ModelRelationDotKey } from '@/core/model/types';
import arrayWrap from '@/core/utilities/arrayWrap';
import { ArrayWrappable } from '@/core/utilities/types';
import uniqueValues from '@/core/utilities/uniqueValues';

export default function include<C extends ActionContext, S extends ModelDefinition>(
  relations: ArrayWrappable<ModelRelationDotKey<S>>,
) {
  return async (
    action: Action<C & ConsumeSchema<S>>,
  ) => action.use(context({
    includes: uniqueValues([
      ...((await action.getContext()).includes ?? []),
      ...arrayWrap(relations),
    ]),
  }));
}
