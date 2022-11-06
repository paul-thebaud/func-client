import { Action, ActionContext, ModelClass, ModelSchemaRaw, ModelValues } from '@/core';

export default function fieldsFor<C extends ActionContext, S extends ModelSchemaRaw>(
  model: ModelClass<S>,
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return (a: Action<C>) => a.merge({
    params: {
      ...a.context.params,
      fields: {
        [model.$type]: fieldset.join(','),
      },
    },
  });
}
