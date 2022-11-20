import { ArrayWrappable } from '@/core/utilities/types';

export default function arrayWrap<T>(value: ArrayWrappable<T>): T[] {
  return Array.isArray(value) ? value : [value];
}
