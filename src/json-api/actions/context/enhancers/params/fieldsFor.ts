import { Action, ActionContext, ModelClass, ModelSchemaRaw, ModelValues, param } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function fieldsFor<S extends ModelSchemaRaw>(
  model: ModelClass<S>,
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return <C extends ActionContext>(a: Action<C>) => a.use(param('fields', {
    ...a.context.params?.fields,
    [model.$config.type]: mergeParamList(
      a.context.params?.fields?.[model.$config.type],
      ...fieldset,
    ),
  }));
}
