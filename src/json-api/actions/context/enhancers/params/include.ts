import { Action, ActionContext, ConsumeSchema, context, ModelDotRelation, ModelSchemaRaw } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function include<C extends ActionContext, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return async (a: Action<C & ConsumeSchema<S>>) => a.use(context({
    params: {
      ...a.context.params,
      include: mergeParamList(a.context.params?.include, ...relations),
    },
  }));
}
