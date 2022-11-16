import { Action, ActionContext, ConsumeSchema, ModelDotRelation, ModelSchemaRaw, param } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function include<C extends ActionContext, S extends ModelSchemaRaw>(
  ...relations: ModelDotRelation<S>[]
) {
  return async (a: Action<C & ConsumeSchema<S>>) => a.use(param(
    'include',
    mergeParamList(a.context.params?.include, ...relations),
  ));
}
