import { Awaitable } from '@/utilities/types';

export type SequentialTransform<T> = ((value: T) => Awaitable<T>);

function sequentialTransform(transformer: SequentialTransform<void>[]): Promise<void>;
function sequentialTransform<T>(transformer: SequentialTransform<T>[], value: T): Promise<T>;
function sequentialTransform<T>(
  transformers: SequentialTransform<T>[],
  value?: T,
) {
  return transformers.reduce(
    async (prev, transformer) => transformer((await prev) as T),
    Promise.resolve(value),
  );
}

export default sequentialTransform;
