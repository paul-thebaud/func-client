import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instancePayload from '@/core/actions/context/enhancers/crud/instancePayload';
import changeExistence from '@/core/actions/context/enhancers/hooks/changeExistence';
import triggerInstanceHook from '@/core/actions/context/enhancers/hooks/triggerInstanceHook';
import instance from '@/core/actions/context/enhancers/instance';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelDefinition, ModelInstance } from '@/core/model/types';

export default function update<R, D, S extends ModelDefinition, I extends ModelInstance<S>>(
  instanceToUpdate: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(action: Action<C>) => action
    .use(instance<S, I>(instanceToUpdate))
    .use(instancePayload(instanceToUpdate))
    .use(context({ method: 'PATCH' }))
    .use(changeExistence(true))
    .use(triggerInstanceHook('onRunning', ['onUpdating', 'onSaving']))
    .use(triggerInstanceHook('onSuccess', ['onUpdated', 'onSaved']));
}
