import globalHooks from '@/core/hooks/globalHooks';
import { AvailableHooks } from '@/core/hooks/types';

export default function globalHook<K extends keyof AvailableHooks>(
  hookName: K,
  hook: AvailableHooks[K],
  replace = false,
) {
  if (replace) {
    globalHooks[hookName] = [...(globalHooks[hookName] ?? []), hook];
  } else {
    globalHooks[hookName] = [hook];
  }
}
