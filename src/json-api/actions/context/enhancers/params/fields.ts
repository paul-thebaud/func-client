import { Action, ActionContext, ConsumeModel, ModelDefinition, ModelKey } from '@/core';
import { Arrayable } from '@/core/utilities/types';
import fieldsFor from '@/json-api/actions/context/enhancers/params/fieldsFor';

export default function fields<C extends ActionContext, D extends ModelDefinition>(
  fieldset: Arrayable<ModelKey<D>>,
) {
  return async (a: Action<C & ConsumeModel<D>>) => a.use(
    fieldsFor((await a.getContext()).model, fieldset),
  );
}
