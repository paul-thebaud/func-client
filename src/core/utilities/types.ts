export type Dictionary<T = unknown> = { [K: string]: T };

export type Constructor<T> = new (...args: any[]) => T;

export type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type Value<T> = T extends (...args: any[]) => any ? ReturnType<T> : T;

export type Awaitable<T> = T | Promise<T>;

export type ArrayWrappable<T> = T | T[];

export type Falsy = null | undefined | false | 0 | -0 | 0n | '';

export type OnlyTruthy<T> = T extends Falsy ? never : T;

export type OnlyFalsy<T> = T extends Falsy ? T : never;
