import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { SerializerI } from '@/core/types';

export default function withSerializer<D, S extends SerializerI<D>>(serializer: S) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ serializer }));
}
