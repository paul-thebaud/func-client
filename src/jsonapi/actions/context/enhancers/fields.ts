import { Action, ActionContext, ConsumeModel, Model, ModelKey } from '@/core';
import fieldsFor from '@/jsonapi/actions/context/enhancers/fieldsFor';
import { ArrayableVariadic } from '@/utilities';

/**
 * Select the given JSON:API fieldsets for the current context's model.
 * The new fieldsets will be merged with the previous ones.
 *
 * @param fieldset
 *
 * @category Enhancers
 */
export default function fields<C extends ActionContext, M extends Model>(
  ...fieldset: ArrayableVariadic<ModelKey<M>>
) {
  return async (action: Action<C & ConsumeModel<M>>) => action.use(
    fieldsFor((await action.context).model, ...fieldset),
  );
}
