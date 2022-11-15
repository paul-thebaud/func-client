import type { ActionContext } from '@/core/actions/types';

export type Hook<A, R = unknown> = (...args: A[]) => R;

export type AffectingHook<T> = (value: T) => T | Promise<T>;

export type AvailableHooks = {
  'action.running': Hook<[ActionContext]>;
};
