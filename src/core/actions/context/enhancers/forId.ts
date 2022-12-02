import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { ModelId } from '@/core/model/types';

export default function forId(id: ModelId | undefined) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ id }));
}
