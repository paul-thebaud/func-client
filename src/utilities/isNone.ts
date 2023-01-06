import isNil from '@/utilities/isNil';
import { Optional } from '@/utilities/types';

export default function isNone(value: unknown): value is Optional<''> {
  return isNil(value) || value === '';
}
