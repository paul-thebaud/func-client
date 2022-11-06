import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import { Serializer } from '@/core/types';

export default function withSerializer<C extends ActionContext, D, S extends Serializer<D>>(
  serializer: S,
) {
  return (a: Action<C>) => a.merge({ serializer });
}
