import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ConsumeSerializer } from '@/core/actions/types';
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';

export default function instancePayload<D, S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return async <C extends ConsumeSerializer<D>>(a: Action<C>) => a.use(context({
    payload: await a.context.serializer.serializeOne(a.context, instance),
  }));
}
