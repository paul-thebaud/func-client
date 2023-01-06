import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import registerHook from '@/core/hooks/registerHook';
import { Awaitable } from '@/utilities';

export default function onFinally<C extends ActionContext>(
  callback: (event: { context: C; }) => Awaitable<void>,
) {
  return (action: Action<C>) => {
    registerHook(action, 'finally', callback);
  };
}
