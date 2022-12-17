import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelInstance } from '@/core/model/types';

/**
 * Target the given model.
 * Register the given model and its definition on context.
 *
 * @param modelToUse
 */
export default function model<D extends {}, I extends ModelInstance<D>, M extends Model<D, I>>(
  modelToUse: M,
) {
  return <C extends ActionContext>(action: Action<C>) => action
    .use(context({
      model: modelToUse,
      baseURL: modelToUse.$config.baseURL,
      type: modelToUse.$config.type,
    }));
}
