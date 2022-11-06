import Action from '@/core/actions/action';
import forModel from '@/core/actions/context/changers/forModel';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function forInstance<C extends ActionContext, S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return (a: Action<C>) => a
    .use(forModel<C, S, I>(instance.constructor as ModelClass<S> & Constructor<I>))
    .merge({ instance });
}
