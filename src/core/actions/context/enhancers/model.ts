import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import target from '@/core/actions/context/enhancers/target';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelInstance } from '@/core/model/types';

/**
 * Target the given model.
 * Use its baseURL and type.
 *
 * @param modelToUse
 *
 * @category Enhancers
 */
export default function model<D extends {}, I extends ModelInstance<D>, M extends Model<D, I>>(
  modelToUse: M,
) {
  return <C extends ActionContext>(action: Action<C>) => action
    .use(target<D, I, M>(modelToUse))
    .use(context({
      // TODO Should baseURL be here?
      baseURL: modelToUse.$config.baseURL,
      type: modelToUse.$config.type,
    }));
}
