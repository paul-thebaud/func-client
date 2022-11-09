import { Action, ActionContext, ConsumeModel, ModelSchemaRaw, ModelValues } from '@/core';
import fieldsFor from '@/json-api/actions/context/enhancers/params/fieldsFor';

export default function fields<C extends ActionContext, S extends ModelSchemaRaw>(
  ...fieldset: (keyof ModelValues<S>)[]
) {
  return (a: Action<C & ConsumeModel<S>>) => a.use(fieldsFor(a.context.model, ...fieldset));
}
