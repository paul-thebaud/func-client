import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forId from '@/core/actions/context/enhancers/forId';
import model from '@/core/actions/context/enhancers/model';
import { ActionContext } from '@/core/actions/types';
import { Model, ModelClassInstance, ModelInstance } from '@/core/model/types';

export default function instance<D extends {}, I extends ModelInstance<D>>(
  instanceToUse: ModelClassInstance<D> & I,
) {
  return <C extends ActionContext>(action: Action<C>) => action
    .use(model(instanceToUse.$model as Model<D, I>))
    .use(context({ instance: instanceToUse }))
    .use(forId(instanceToUse.id));
}
