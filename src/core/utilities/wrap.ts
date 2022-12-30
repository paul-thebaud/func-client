import isNil from '@/core/utilities/isNil';
import { Arrayable, Optional } from '@/core/utilities/types';

export default function wrap<T>(value?: Optional<Arrayable<T>>): T[] {
  if (isNil(value)) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}
