import { AffectingHook } from '@/core/hooks/types';

export default function runAffectingHooks<T>(value: T, hooks: AffectingHook<T>[]) {
  return hooks.reduce(async (prev, hook) => hook(await prev), Promise.resolve(value));
}
