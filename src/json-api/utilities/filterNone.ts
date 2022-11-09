import isNone from '@/core/utilities/isNone';

export default function filterNone<T>(values: T[]) {
  return values.filter((v) => isNone(v));
}
