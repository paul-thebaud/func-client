import Action from '@/core/actions/action';
import context from '@/core/actions/context/enhancers/context';
import { ActionContext, ActionHooks } from '@/core/actions/types';

export default function hook<K extends keyof ActionHooks>(key: K, hookToSet: ActionHooks[K]) {
  return <C extends ActionContext>(a: Action<C>) => a.use(context({
    hooks: {
      ...a.context.hooks,
      [key]: hookToSet,
    },
  }));
}
