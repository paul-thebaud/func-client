import isInstance from '@/core/model/guards/isInstance';
import { isNil } from '@/utilities';

export default function isSame(
  value: unknown,
  otherValue: unknown,
): boolean {
  return isInstance(value)
    && isInstance(otherValue)
    && value.$model.$config.type === otherValue.$model.$config.type
    && !isNil(value.id)
    && value.id === otherValue.id;
}
