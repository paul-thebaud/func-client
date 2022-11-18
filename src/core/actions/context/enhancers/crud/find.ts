import Action from '@/core/actions/action';
import forId from '@/core/actions/context/enhancers/forId';
import forModel from '@/core/actions/context/enhancers/forModel';
import { ActionContext } from '@/core/actions/types';
import { ModelClass, ModelId, ModelSchemaRaw } from '@/core/model/types';
import { Constructor } from '@/core/utilities/types';

export default function find<S extends ModelSchemaRaw, I>(
  model: ModelClass<S> & Constructor<I>,
  id: ModelId,
) {
  return <C extends ActionContext>(a: Action<C>) => a
    .use(forModel(model))
    .use(forId(id));
}
