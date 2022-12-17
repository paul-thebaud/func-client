import { Action, ActionContext, Model, ModelKey, ConsumeModel } from '@/core';
import { Arrayable } from '@/core/utilities/types';
import fieldsFor from '@/json-api/actions/context/enhancers/params/fieldsFor';

export default function fields<C extends ActionContext, M extends Model>(
  fieldset: Arrayable<ModelKey<M>>,
) {
  return async (a: Action<C & ConsumeModel<M>>) => a.use(
    fieldsFor((await a.getContext()).model, fieldset),
  );
}
