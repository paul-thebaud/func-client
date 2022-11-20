import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ConsumeSerializer } from '@/core/actions/types';
import { ModelDefinition, ModelInstance } from '@/core/model/types';

export default function instancePayload<D, S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
) {
  return async <C extends ConsumeSerializer<D>>(a: Action<C>) => a.use(context({
    payload: await (await a.getContext()).serializer.serializeOne((await a.getContext()), instance),
  }));
}
