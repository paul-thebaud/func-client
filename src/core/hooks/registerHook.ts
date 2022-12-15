/* eslint-disable no-param-reassign */
import { Hookable, HooksDefinition } from '@/core/hooks/types';
import unregisterHook from '@/core/hooks/unregisterHook';

export default function registerHook<D extends HooksDefinition, K extends keyof D>(
  hookable: Hookable<D>,
  key: K,
  callback: D[K],
) {
  if (hookable.$hooks !== null) {
    hookable.$hooks[key] = [...(hookable.$hooks[key] ?? []), callback] as D[K][];
  }

  return () => unregisterHook(hookable, key, callback);
}
