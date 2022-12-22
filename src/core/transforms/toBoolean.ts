import { FunctionTransform } from '@/core/transforms/types';
import isNone from '@/core/utilities/isNone';

export default function toBoolean(
  trueValues: unknown[] = [true, 1, '1', 'true', 'yes'],
): FunctionTransform<boolean | undefined, unknown> {
  return (value: unknown) => (
    isNone(value) ? undefined : trueValues.indexOf(value) !== -1
  );
}
