import { Transform } from '@/core/transforms/types';

export type UseTransformAction = 'serialize' | 'deserialize';

export default function useTransform<T, S, A extends UseTransformAction>(
  transformer: Transform<T, S> | undefined,
  action: A,
) {
  if (!transformer) {
    return (value: unknown) => value;
  }

  if (typeof transformer === 'function') {
    return transformer;
  }

  return transformer[action];
}
