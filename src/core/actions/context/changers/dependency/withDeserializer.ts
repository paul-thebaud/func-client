import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import { Deserializer } from '@/core/types';

export default function withDeserializer<C extends ActionContext, D, DS extends Deserializer<D>>(
  deserializer: DS,
) {
  return (a: Action<C>) => a.merge({ deserializer });
}
