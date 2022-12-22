import { FunctionTransform } from '@/core/transforms/types';
import isNone from '@/core/utilities/isNone';

export default function toString(): FunctionTransform<string | undefined, unknown> {
  return (value: unknown) => (
    isNone(value) ? undefined : String(value)
  );
}
