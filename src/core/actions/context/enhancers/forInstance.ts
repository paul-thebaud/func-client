import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forModel from '@/core/actions/context/enhancers/forModel';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function forInstance<S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(forModel<S, I>(instance.constructor as ModelClass<S> & Constructor<I>))
    .use(context({ instance }));
}
