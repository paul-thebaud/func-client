import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { CacheI } from '@/core/types';

export default function withCache<Cache extends CacheI>(cache: Cache) {
  return <C extends ActionContext>(action: Action<C>) => action.use(context({ cache }));
}
