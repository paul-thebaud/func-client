import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { SerializerI } from '@/core/types';

export default function withSerializer<
  Data,
  Serializer extends SerializerI<Data>,
>(serializer: Serializer) {
  return <C extends ActionContext>(action: Action<C>) => action.use(context({ serializer }));
}
