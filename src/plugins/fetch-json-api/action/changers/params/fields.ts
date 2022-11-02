import { WithModelContext } from '@/core/action/changers/forModel';
import { ModelSchemaRaw, ModelValues } from '@/core/model/types';
import merge from '@/core/utilities/merge';

export default function fields<C, S extends ModelSchemaRaw>(
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return (context: WithModelContext<C, S>) => merge(context, {
    params: {
      fields: {
        [context.type]: fieldset.join(','),
      },
    },
  });
}
