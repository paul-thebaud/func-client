import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function withType<C extends ActionContext>(type: string) {
  return (a: Action<C>) => a.merge({ type });
}
