import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import registerHook from '@/core/hooks/registerHook';
import { Awaitable } from '@/utilities';

export default function onPreparing<C extends ActionContext>(
  callback: () => Awaitable<void>,
) {
  return (action: Action<C>) => {
    registerHook(action, 'preparing', callback);
  };
}
