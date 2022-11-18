import Action from '@/core/actions/action';
import { ActionEvent, ActionHooks, ConsumeInstance } from '@/core/actions/types';
import { ModelInstanceHook } from '@/core/model/types';

export default function triggerInstanceHook(
  actionHook: keyof ActionHooks<any>,
  instanceHooks: ModelInstanceHook[],
) {
  return <C extends ConsumeInstance<any, any>>(
    action: Action<C>,
  ) => action.hook(actionHook, (event: ActionEvent<C>) => {
    instanceHooks.forEach((instanceHook) => {
      if (typeof event.context.instance[instanceHook] === 'function') {
        event.context.instance[instanceHook]();
      }
    });
  });
}
