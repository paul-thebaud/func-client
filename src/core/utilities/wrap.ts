import { Arrayable } from '@/core/utilities/types';

export default function wrap<T>(value: Arrayable<T>): T[] {
  return Array.isArray(value) ? value : [value];
}
