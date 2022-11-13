export type Hook<A, R = unknown> = (...args: A[]) => R;

export type AffectingHook<T> = (value: T) => T | Promise<T>;
