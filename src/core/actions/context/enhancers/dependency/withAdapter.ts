import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { AdapterI } from '@/core/types';

export default function withAdapter<R, RD, A extends AdapterI<R, RD>>(adapter: A) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({ adapter }));
}
