import { Action, ActionContext, ForModelContext, ModelSchemaRaw, ModelValues } from '@/core';
import fieldsFor from '@/json-api/actions/context/changers/params/fieldsFor';

export default function fields<C extends ActionContext, S extends ModelSchemaRaw>(
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return (a: Action<ForModelContext<C, S>>) => a.use(fieldsFor(a.context.model, ...fieldset));
}
