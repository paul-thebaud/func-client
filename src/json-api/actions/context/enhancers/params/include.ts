import { Action, ActionContext, ConsumeSchema, deepContext, ModelDotRelation, ModelSchemaRaw } from '@/core';
import cleanParamList from '@/json-api/utilities/cleanParamList';

export default function include<C extends ActionContext, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return async (a: Action<C & ConsumeSchema<S>>) => a.use(deepContext({
    params: {
      include: cleanParamList(a.context.params?.include, ...relations),
    },
  }));
}
