import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { Store } from '@/core/store/types';

export default function withStore<S extends Store>(store: S) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ store }));
}
