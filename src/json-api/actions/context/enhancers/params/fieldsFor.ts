import { Action, ActionContext, Model, ModelKey, param } from '@/core';
import previousParams from '@/core/actions/context/utilities/previousParams';
import { Arrayable } from '@/core/utilities/types';
import wrap from '@/core/utilities/wrap';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function fieldsFor<M extends Model>(
  model: M,
  fieldset: Arrayable<ModelKey<M>>,
) {
  return async <C extends ActionContext>(a: Action<C>) => {
    const prevFields = previousParams(await a.getContext())?.fields;

    return a.use(param('fields', {
      ...prevFields,
      [model.$config.type]: mergeParamList([
        prevFields?.[model.$config.type],
        ...wrap(fieldset),
      ]),
    }));
  };
}
