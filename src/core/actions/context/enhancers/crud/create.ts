import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instancePayload from '@/core/actions/context/enhancers/crud/instancePayload';
import forId from '@/core/actions/context/enhancers/forId';
import changeExistence from '@/core/actions/context/enhancers/hooks/changeExistence';
import triggerInstanceHook from '@/core/actions/context/enhancers/hooks/triggerInstanceHook';
import instance from '@/core/actions/context/enhancers/instance';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelDefinition, ModelInstance } from '@/core/model/types';

export default function create<R, D, S extends ModelDefinition, I>(
  instanceToCreate: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => a
    .use(instance(instanceToCreate))
    .use(instancePayload(instanceToCreate))
    .use(forId(undefined))
    .use(context({ method: 'POST' }))
    .use(changeExistence(true))
    .use(triggerInstanceHook('onRunning', ['onCreating', 'onSaving']))
    .use(triggerInstanceHook('onSuccess', ['onCreated', 'onSaved']));
}
