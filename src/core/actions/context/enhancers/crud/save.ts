import Action from '@/core/actions/action';
import create from '@/core/actions/context/enhancers/crud/create';
import update from '@/core/actions/context/enhancers/crud/update';
import { ConsumeAdapter, ConsumeInstance, ConsumeModel, ConsumeSerializer } from '@/core/actions/types';
import { Model, ModelClassInstance, ModelInstance } from '@/core/model/types';

export default function save<R, AD, D extends {}, I extends ModelInstance<D>>(
  instance: ModelClassInstance<D> & I,
) {
  return <C extends ConsumeAdapter<R, AD> & ConsumeSerializer<AD>>(a: Action<C>) => (
    instance.exists
      ? a.use(update(instance))
      : a.use(create(instance))
  ) as Action<C & ConsumeModel<Model<D, I>> & ConsumeInstance<I>>;
}
