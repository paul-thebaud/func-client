import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instancePayload from '@/core/actions/context/enhancers/crud/instancePayload';
import forId from '@/core/actions/context/enhancers/forId';
import forInstance from '@/core/actions/context/enhancers/forInstance';
import changeExistence from '@/core/actions/context/enhancers/hooks/changeExistence';
import triggerInstanceHook from '@/core/actions/context/enhancers/hooks/triggerInstanceHook';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function update<R, D, S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => a
    .use(forInstance(instance))
    .use(forId(instance.id))
    .use(instancePayload(instance))
    .use(context({ method: 'PATCH' }))
    .use(changeExistence(true))
    .use(triggerInstanceHook('onRunning', ['onUpdating', 'onSaving']))
    .use(triggerInstanceHook('onSuccess', ['onUpdated', 'onSaved']));
}
