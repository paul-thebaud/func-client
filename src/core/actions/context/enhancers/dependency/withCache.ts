import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { InstancesCacheI } from '@/core/types';

export default function withCache<IC extends InstancesCacheI>(cache: IC) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ cache }));
}
