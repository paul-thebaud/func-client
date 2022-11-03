import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';

export default function withRelation<C extends ActionContext>(relation: string) {
  return (a: Action<C>) => a.merge({ relation });
}
