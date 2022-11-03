import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { Store } from '@/core/store/types';

export default function withStore<C extends ActionContext, S extends Store>(store: S) {
  return (a: Action<C>) => a.merge({ store });
}
