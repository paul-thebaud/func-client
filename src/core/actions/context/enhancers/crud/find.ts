import Action from '@/core/actions/action';
import forId from '@/core/actions/context/enhancers/forId';
import model from '@/core/actions/context/enhancers/model';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelId, ModelInstance } from '@/core/model/types';

export default function find<D extends {}, I extends ModelInstance<D>, M extends Model<D, I>>(
  modelToUse: M,
  id: ModelId,
) {
  return <C extends ActionContext>(action: Action<C>) => action
    .use(model(modelToUse))
    .use(forId(id));
}
