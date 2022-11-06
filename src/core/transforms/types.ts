export type FunctionTransform<T, S> = (value: S) => Promise<T> | T;

export type ObjectTransform<T, S> = {
  serialize(value: T): Promise<S> | S;
  deserialize(value: S): Promise<T> | T;
};

export type Transform<T, S> =
  | FunctionTransform<T, S>
  | ObjectTransform<T, S>;
