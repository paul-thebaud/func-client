import isNone from '@/core/utilities/isNone';

export default function excludeNone<T>(values: T[]) {
  return values.filter((v) => !isNone(v));
}
