import { Model, ModelSchemaRaw, ModelValues } from '@/core/model/types';
import merge from '@/core/utilities/merge';
import { Dictionary } from '@/core/utilities/types';

export default function fieldsFor<C extends Dictionary, S extends ModelSchemaRaw>(
  model: Model<S>,
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return (context: C) => merge(context, {
    params: {
      fields: {
        [model.$type]: fieldset.join(','),
      },
    },
  });
}
