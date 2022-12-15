import Action from '@/core/actions/action';
import { ActionContext } from '@/core/actions/types';
import registerHook from '@/core/hooks/registerHook';
import { Awaitable } from '@/core/utilities/types';

export default function onError<C extends ActionContext>(
  callback: (event: { context: C; error: unknown; }) => Awaitable<void>,
) {
  return (action: Action<C>) => {
    registerHook(action, 'error', callback);
  };
}
