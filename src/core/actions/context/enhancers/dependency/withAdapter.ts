import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { Adapter } from '@/core/types';

export default function withAdapter<R, D, A extends Adapter<R, D>>(adapter: A) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ adapter }));
}
