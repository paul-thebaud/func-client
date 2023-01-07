import Action from '@/core/actions/action';
import useContext from '@/core/actions/context/consumers/useContext';
import useSerializerContext from '@/core/actions/context/consumers/useSerializerContext';
import context from '@/core/actions/context/enhancers/context';
import { ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';

export default function serializeInstance<SD>(instance: ModelInstance) {
  return async <C extends ConsumeSerializer<SD>>(action: Action<C>) => {
    const serializer = await useSerializerContext(action);

    action.use(context({
      data: await serializer.serialize(instance, await useContext(action)),
    }));
  };
}
