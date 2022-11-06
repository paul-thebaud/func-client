import isNone from '@/core/utilities/isNone';

export default function toString() {
  return (value: unknown) => (
    isNone(value) ? undefined : String(value)
  );
}
