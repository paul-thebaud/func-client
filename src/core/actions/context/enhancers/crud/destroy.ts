import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import changeExistence from '@/core/actions/context/enhancers/hooks/changeExistence';
import triggerInstanceHook from '@/core/actions/context/enhancers/hooks/triggerInstanceHook';
import instance from '@/core/actions/context/enhancers/instance';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelDefinition, ModelInstance } from '@/core/model/types';

export default function destroy<R, D, S extends ModelDefinition, I>(
  instanceToDestroy: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => a
    .use(instance(instanceToDestroy))
    .use(context({ method: 'DELETE' }))
    .use(changeExistence(false))
    .use(triggerInstanceHook('onRunning', ['onDestroying']))
    .use(triggerInstanceHook('onSuccess', ['onDestroyed']));
}
