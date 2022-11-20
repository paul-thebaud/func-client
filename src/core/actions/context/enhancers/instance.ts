import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import model from '@/core/actions/context/enhancers/model';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelDefinition, ModelInstance } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function instance<S extends ModelDefinition, I>(
  instanceToUse: ModelInstance<S> & I,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(model<S, I>(instanceToUse.constructor as ModelClass<S> & Constructor<I>))
    .use(context({ instance: instanceToUse }));
}
