import { ObjectTransform, Transform } from '@/core/transforms/types';

// TODO Do not export this function.
export default function useTransform(
  transformer: Transform<unknown, unknown> | undefined,
  action: keyof ObjectTransform<unknown, unknown>,
) {
  if (!transformer) {
    return (value: unknown) => value;
  }

  if (typeof transformer === 'function') {
    return transformer;
  }

  return transformer[action];
}
