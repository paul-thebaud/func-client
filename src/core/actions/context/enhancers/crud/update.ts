import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instancePayload from '@/core/actions/context/enhancers/crud/instancePayload';
import changeInstanceExistence from '@/core/actions/context/enhancers/hooks/changeInstanceExistence';
import onPreparing from '@/core/actions/context/enhancers/hooks/onPreparing';
import onSuccess from '@/core/actions/context/enhancers/hooks/onSuccess';
import runInstanceHooks from '@/core/actions/context/enhancers/hooks/runInstanceHooks';
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
    .use(changeInstanceExistence(true))
    .use(onPreparing(runInstanceHooks(instanceToUpdate, ['updating', 'saving'])))
    .use(onSuccess(runInstanceHooks(instanceToUpdate, ['updated', 'saved'])));
}
