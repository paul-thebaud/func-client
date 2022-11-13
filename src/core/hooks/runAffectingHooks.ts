import { AffectingHook } from '@/core/hooks/types';

export default function runAffectingHooks<T>(hooks: AffectingHook<T>[], value: T) {
  return hooks.reduce(async (prev, hook) => hook(await prev), Promise.resolve(value));
}
