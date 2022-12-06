import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forSchema from '@/core/actions/context/enhancers/forSchema';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelDefinition, ModelInstance } from '@/core/model/types';

/**
 * Target the given model.
 * Register the given model and its definition on context.
 *
 * @param modelToUse
 */
export default function model<D extends ModelDefinition, I extends ModelInstance<D>>(
  modelToUse: Model<D, I>,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(forSchema(modelToUse.$schema as D))
    .use(context({
      model: modelToUse,
      baseURL: modelToUse.$config.baseURL,
      type: modelToUse.$config.type,
    }));
}
