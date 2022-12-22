import { FunctionTransform } from '@/core/transforms/types';
import isNone from '@/core/utilities/isNone';

export default function toNumber(): FunctionTransform<number | undefined, unknown> {
  return (value: unknown) => (
    isNone(value) ? undefined : Number(value)
  );
}
