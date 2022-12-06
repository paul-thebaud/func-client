import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forId from '@/core/actions/context/enhancers/forId';
import model from '@/core/actions/context/enhancers/model';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelDefinition, ModelInstance } from '@/core/model/types';

export default function instance<D extends ModelDefinition, I extends ModelInstance<D>>(
  instanceToUse: ModelInstance<D> & I,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(model<D, I>(instanceToUse.constructor as Model<D, I>))
    .use(context({ instance: instanceToUse }))
    .use(forId(instanceToUse.id));
}
