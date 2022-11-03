import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function withPath<C extends ActionContext>(path: string) {
  return (a: Action<C>) => a.merge({ path });
}
