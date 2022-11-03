import { Action, ActionContext, ForModelContext, ModelSchemaRaw, ModelValues } from '@/core';

export default function fields<C extends ActionContext, S extends ModelSchemaRaw>(
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return (a: Action<ForModelContext<C, S>>) => a.merge({
    params: {
      ...a.context.params,
      fields: {
        [a.context.type]: fieldset.join(','),
      },
    },
  });
}
