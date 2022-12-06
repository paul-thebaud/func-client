import Action from '@/core/actions/action';
import { ActionEvent, ActionHooks, ConsumeInstance } from '@/core/actions/types';
import runInstanceHooks from '@/core/model/hooks/runInstanceHooks';
import { ModelInstanceHook } from '@/core/model/types';
import { Arrayable } from '@/core/utilities/types';

export default function triggerInstanceHook(
  onActionHook: keyof ActionHooks<any>,
  hooks: Arrayable<ModelInstanceHook>,
) {
  return <C extends ConsumeInstance<any, any>>(
    action: Action<C>,
  ) => action.hook(onActionHook, (event: ActionEvent<C>) => {
    runInstanceHooks(event.context.instance, hooks);
  });
}
