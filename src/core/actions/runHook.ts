import { ActionContext, ActionHooks } from '@/core/actions/types';

export default function runHook<T, R = T>(
  context: ActionContext,
  key: keyof ActionHooks,
  param: T,
): T | R {
  const hook = (context.hooks || {})[key];
  if (hook) {
    return hook(param);
  }

  return param;
}
