import Action from '@/core/actions/action';
import create from '@/core/actions/context/enhancers/crud/create';
import update from '@/core/actions/context/enhancers/crud/update';
import { ConsumeAdapter, ConsumeInstance, ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function save<R, D, S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => (
    instance.exists
      ? a.use(update(instance))
      : a.use(create(instance))
  ) as Action<C & ConsumeInstance<S, I>>;
}
