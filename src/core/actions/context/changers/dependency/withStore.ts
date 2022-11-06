import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import { Store } from '@/core/store/types';

export default function withStore<C extends ActionContext, S extends Store>(store: S) {
  return (a: Action<C>) => a.merge({ store });
}
