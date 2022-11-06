import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import { Adapter } from '@/core/types';

export default function withAdapter<C extends ActionContext, R, D, A extends Adapter<R, D>>(
  adapter: A,
) {
  return (a: Action<C>) => a.merge({ adapter });
}
