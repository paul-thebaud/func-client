import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import instanceData from '@/core/actions/context/enhancers/crud/instanceData';
import changeInstanceExistence from '@/core/actions/context/enhancers/hooks/changeInstanceExistence';
import onPreparing from '@/core/actions/context/enhancers/hooks/onPreparing';
import onSuccess from '@/core/actions/context/enhancers/hooks/onSuccess';
import runInstanceHooks from '@/core/actions/context/enhancers/hooks/runInstanceHooks';
import instance from '@/core/actions/context/enhancers/instance';
import { ConsumeAdapter, ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';

export default function update<AD, SD, I extends ModelInstance>(instanceToUpdate: I) {
  return <C extends ConsumeAdapter<AD> & ConsumeSerializer<SD>>(action: Action<C>) => action
    .use(instance(instanceToUpdate))
    .use(instanceData(instanceToUpdate))
    .use(context({ action: 'UPDATE' }))
    .use(changeInstanceExistence(true))
    .use(onPreparing(runInstanceHooks(instanceToUpdate, ['updating', 'saving'])))
    .use(onSuccess(runInstanceHooks(instanceToUpdate, ['updated', 'saved'])));
}
