import { ForModelContext } from '@/core/action/changers/forModel';
import type Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { ModelSchemaRaw, ModelValues } from '@/core/model/types';

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
