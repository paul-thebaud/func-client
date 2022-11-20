import Action from '@/core/actions/action';
import forId from '@/core/actions/context/enhancers/forId';
import model from '@/core/actions/context/enhancers/model';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelDefinition, ModelId } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function find<S extends ModelDefinition, I>(
  modelToUse: ModelClass<S> & Constructor<I>,
  id: ModelId,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(model(modelToUse))
    .use(forId(id));
}
