import isInstance from '@/core/model/guards/isInstance';

export default function isSame(
  value: unknown,
  otherValue: unknown,
): boolean {
  return isInstance(value)
    && isInstance(otherValue)
    && value.constructor.$config.type === otherValue.constructor.$config.type
    && value.id === otherValue.id;
}
