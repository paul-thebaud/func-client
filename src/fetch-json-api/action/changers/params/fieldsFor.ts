import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { Model, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function fieldsFor<C extends ActionContext, S extends ModelSchemaRaw>(
  model: Model<S>,
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
