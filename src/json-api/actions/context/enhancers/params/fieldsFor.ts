import { Action, ActionContext, context, ModelClass, ModelSchemaRaw, ModelValues } from '@/core';
import mergeParamList from '@/json-api/utilities/mergeParamList';

export default function fieldsFor<S extends ModelSchemaRaw>(
  model: ModelClass<S>,
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    params: {
      ...a.context.params,
      fields: {
        ...a.context.params?.fields,
        [model.$type]: mergeParamList(a.context.params?.fields?.[model.$type], ...fieldset),
      },
    },
  }));
}
