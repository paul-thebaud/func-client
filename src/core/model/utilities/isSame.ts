import isInstance from '@/core/model/guards/isInstance';

export default function isSame(
  value: unknown,
  otherValue: unknown,
): boolean {
  return isInstance(value)
    && isInstance(otherValue)
    && value.$model.$config.type === otherValue.$model.$config.type
    && value.id === otherValue.id;
}
