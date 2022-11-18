import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instancePayload from '@/core/actions/context/enhancers/crud/instancePayload';
import forInstance from '@/core/actions/context/enhancers/forInstance';
import changeExistence from '@/core/actions/context/enhancers/hooks/changeExistence';
import triggerInstanceHook from '@/core/actions/context/enhancers/hooks/triggerInstanceHook';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function create<R, D, S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => a
    .use(forInstance(instance))
    .use(instancePayload(instance))
    .use(context({ method: 'POST' }))
    .use(changeExistence(true))
    .use(triggerInstanceHook('onRunning', ['onCreating', 'onSaving']))
    .use(triggerInstanceHook('onSuccess', ['onCreated', 'onSaved']));
}
