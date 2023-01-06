import { FunctionTransform } from '@/core/transforms/types';
import { isNone } from '@/utilities';

export default function toBoolean(
  trueValues: unknown[] = [true, 1, '1', 'true', 'yes'],
): FunctionTransform<boolean | undefined, unknown> {
  return (value: unknown) => (
    isNone(value) ? undefined : trueValues.indexOf(value) !== -1
  );
}
