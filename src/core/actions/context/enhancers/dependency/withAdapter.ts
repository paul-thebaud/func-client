import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';
import { AdapterI } from '@/core/types';

export default function withAdapter<
  Data,
  Adapter extends AdapterI<Data>,
>(adapter: Adapter) {
  return <C extends ActionContext>(action: Action<C>) => action.use(context({ adapter }));
}
