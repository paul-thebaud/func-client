import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext } from '@/core/actions/types';

export default function fullPath(newPath: string) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    type: undefined,
    id: undefined,
    relation: undefined,
    path: newPath,
  }));
}
