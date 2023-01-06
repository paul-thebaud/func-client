import { FunctionTransform } from '@/core/transforms/types';
import { isNone } from '@/utilities';

export default function toNumber(): FunctionTransform<number | undefined, unknown> {
  return (value: unknown) => (
    isNone(value) ? undefined : Number(value)
  );
}
