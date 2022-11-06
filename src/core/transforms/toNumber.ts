import isNone from '@/core/utilities/isNone';

export default function toNumber() {
  return (value: unknown) => (
    isNone(value) ? undefined : Number(value)
  );
}
