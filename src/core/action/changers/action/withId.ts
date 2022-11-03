import Action from '@/core/action/action';
import { ActionContext } from '@/core/action/types';
import { ModelId } from '@/core/model/types';

export default function withId<C extends ActionContext>(id: ModelId) {
  return (a: Action<C>) => a.merge({ id });
}
