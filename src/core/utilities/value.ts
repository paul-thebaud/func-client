import { Value } from '@/core/utilities/types';

export default function value<T>(
  valueOrCallback: T,
  ...params: unknown[]
): Value<T> {
  if (typeof valueOrCallback === 'function') {
    return valueOrCallback(...params);
  }

  return valueOrCallback as Value<T>;
}
