import { Action, ActionContext, ArrayWrappable, ConsumeModel, ModelDefinition, ModelValues } from '@/core';
import fieldsFor from '@/json-api/actions/context/enhancers/params/fieldsFor';

export default function fields<C extends ActionContext, S extends ModelDefinition>(
  fieldset: ArrayWrappable<keyof ModelValues<S>>,
) {
  return async (a: Action<C & ConsumeModel<S>>) => a.use(
    fieldsFor((await a.getContext()).model, fieldset),
  );
}
