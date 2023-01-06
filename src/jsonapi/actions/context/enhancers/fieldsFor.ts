import { Action, ActionContext, Model, ModelKey } from '@/core';
import { param } from '@/http';
import prevParams from '@/http/actions/context/utilities/prevParams';
import mergeParamList from '@/jsonapi/actions/context/utilities/mergeParamList';
import { ArrayableVariadic, wrapVariadic } from '@/utilities';

export default function fieldsFor<M extends Model>(
  model: M,
  ...fieldset: ArrayableVariadic<ModelKey<M>>
) {
  return async <C extends ActionContext>(action: Action<C>) => {
    const prevFields = prevParams(await action.context)?.fields;

    return action.use(param('fields', {
      ...prevFields,
      [model.$config.type]: mergeParamList([
        prevFields?.[model.$config.type],
        ...wrapVariadic(...fieldset),
      ]),
    }));
  };
}