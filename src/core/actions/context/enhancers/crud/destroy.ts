import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import changeInstanceExistence from '@/core/actions/context/enhancers/hooks/changeInstanceExistence';
import onPreparing from '@/core/actions/context/enhancers/hooks/onPreparing';
import onSuccess from '@/core/actions/context/enhancers/hooks/onSuccess';
import runInstanceHooks from '@/core/actions/context/enhancers/hooks/runInstanceHooks';
import instance from '@/core/actions/context/enhancers/instance';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelDefinition, ModelInstance } from '@/core/model/types';

export default function destroy<R, D, S extends ModelDefinition, I extends ModelInstance<S>>(
  instanceToDestroy: ModelInstance<S> & I,
) {
  return <C extends ConsumeAdapter<R, D> & ConsumeSerializer<D>>(a: Action<C>) => a
    .use(instance<S, I>(instanceToDestroy))
    .use(context({ method: 'DELETE' }))
    .use(changeInstanceExistence(false))
    .use(onPreparing(runInstanceHooks(instanceToDestroy, ['destroying'])))
    .use(onSuccess(runInstanceHooks(instanceToDestroy, ['destroyed'])));
}
