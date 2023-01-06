import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';

export default function instanceData<SD>(instance: ModelInstance) {
  return async <C extends ConsumeSerializer<SD>>(action: Action<C>) => action.use(context({
    data: await (await action.context).serializer.serialize(instance, await action.context),
  }));
}
