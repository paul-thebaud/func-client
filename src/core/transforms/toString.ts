import { FunctionTransform } from '@/core/transforms/types';
import { isNone } from '@/utilities';

export default function toString(): FunctionTransform<string | undefined, unknown> {
  return (value: unknown) => (
    isNone(value) ? undefined : String(value)
  );
}
