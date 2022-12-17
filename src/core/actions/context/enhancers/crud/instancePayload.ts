import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance } from '@/core/model/types';

export default function instancePayload<D>(
  instance: ModelInstance,
) {
  return async <C extends ConsumeSerializer<D>>(a: Action<C>) => a.use(context({
    payload: await (await a.getContext()).serializer.serializeOne((await a.getContext()), instance),
  }));
}
