import Action from '@/core/actions/action';
import { ActionContext, ConsumableContext } from '@/core/actions/types';

export default function useContext<C extends ActionContext>(
  actionOrContext: ConsumableContext<C>,
) {
  return actionOrContext instanceof Action
    ? actionOrContext.context
    : Promise.resolve(actionOrContext);
}
