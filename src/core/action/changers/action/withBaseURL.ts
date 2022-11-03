import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function withBaseURL<C extends ActionContext>(baseURL: string) {
  return (a: Action<C>) => a.merge({ baseURL });
}
