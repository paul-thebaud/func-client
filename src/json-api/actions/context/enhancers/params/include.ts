import { Action, ActionContext, ConsumeSchema, deepContext, ModelDotRelation, ModelSchemaRaw } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function include<C extends ActionContext, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return async (a: Action<C & ConsumeSchema<S>>) => a.use(deepContext({
    params: {
      include: mergeParamList(a.context.params?.include, ...relations),
    },
  }));
}
