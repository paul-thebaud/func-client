import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instancePayload from '@/core/actions/context/enhancers/crud/instancePayload';
import forId from '@/core/actions/context/enhancers/forId';
import changeInstanceExistence from '@/core/actions/context/enhancers/hooks/changeInstanceExistence';
import onPreparing from '@/core/actions/context/enhancers/hooks/onPreparing';
import onSuccess from '@/core/actions/context/enhancers/hooks/onSuccess';
import runInstanceHooks from '@/core/actions/context/enhancers/hooks/runInstanceHooks';
import instance from '@/core/actions/context/enhancers/instance';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelDefinition, ModelInstance } from '@/core/model/types';

export default function create<R, D, S extends ModelDefinition, I extends ModelInstance<S>>(
  instanceToCreate: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(action: Action<C>) => action
    .use(forId(undefined))
    .use(instance<S, I>(instanceToCreate))
    .use(instancePayload(instanceToCreate))
    .use(context({ method: 'POST' }))
    .use(changeInstanceExistence(true))
    .use(onPreparing(runInstanceHooks(instanceToCreate, ['creating', 'saving'])))
    .use(onSuccess(runInstanceHooks(instanceToCreate, ['created', 'saved'])));
}
