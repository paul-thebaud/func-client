import { Action, ActionContext, ArrayWrappable, ConsumeSchema, ModelDefinition, ModelDotRelation, param } from '@/core';
import previousParams from '@/core/actions/context/utilities/previousParams';
import arrayWrap from '@/core/utilities/arrayWrap';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function include<C extends ActionContext, S extends ModelDefinition>(
  relations: ArrayWrappable<ModelDotRelation<S>>,
) {
  return async (a: Action<C & ConsumeSchema<S>>) => a.use(param(
    'include',
    mergeParamList([
      previousParams(await a.getContext())?.include,
      ...arrayWrap(relations),
    ]),
  ));
}
