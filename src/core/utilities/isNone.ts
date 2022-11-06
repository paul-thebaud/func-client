import isNil from '@/core/utilities/isNil';

export default function isNone(value: unknown): value is '' | null | undefined {
  return isNil(value) || value === '';
}
