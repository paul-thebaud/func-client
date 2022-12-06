import Action from '@/core/actions/action';
import forId from '@/core/actions/context/enhancers/forId';
import model from '@/core/actions/context/enhancers/model';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelDefinition, ModelId, ModelInstance } from '@/core/model/types';

export default function find<S extends ModelDefinition, I extends ModelInstance<S>>(
  modelToUse: Model<S, I>,
  id: ModelId,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(model(modelToUse))
    .use(forId(id));
}
