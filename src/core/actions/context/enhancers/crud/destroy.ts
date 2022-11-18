import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import forId from '@/core/actions/context/enhancers/forId';
import forInstance from '@/core/actions/context/enhancers/forInstance';
import changeExistence from '@/core/actions/context/enhancers/hooks/changeExistence';
import triggerInstanceHook from '@/core/actions/context/enhancers/hooks/triggerInstanceHook';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function destroy<R, D, S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return async <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => a
    .use(forInstance(instance))
    .use(forId(instance.id))
    .use(context({ method: 'DELETE' }))
    .use(changeExistence(false))
    .use(triggerInstanceHook('onRunning', ['onDestroying']))
    .use(triggerInstanceHook('onSuccess', ['onDestroyed']));
}
