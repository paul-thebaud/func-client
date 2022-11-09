import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { Serializer } from '@/core/types';

export default function withSerializer<D, S extends Serializer<D>>(serializer: S) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ serializer }));
}
