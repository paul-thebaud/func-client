import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { DeserializerI } from '@/core/types';

export default function withDeserializer<D, DS extends DeserializerI<D>>(deserializer: DS) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ deserializer }));
}
