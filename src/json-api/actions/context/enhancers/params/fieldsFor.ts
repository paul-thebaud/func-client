import { Action, ActionContext, ArrayWrappable, ModelClass, ModelDefinition, ModelValues, param } from '@/core';
import previousParams from '@/core/actions/context/utilities/previousParams';
import arrayWrap from '@/core/utilities/arrayWrap';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function fieldsFor<S extends ModelDefinition>(
  model: ModelClass<S>,
  fieldset: ArrayWrappable<keyof ModelValues<S>>,
) {
  return async <C extends ActionContext>(a: Action<C>) => {
    const prevFields = previousParams(await a.getContext())?.fields;

    return a.use(param('fields', {
      ...prevFields,
      [model.$config.type]: mergeParamList([
        prevFields?.[model.$config.type],
        ...arrayWrap(fieldset),
      ]),
    }));
  };
}
