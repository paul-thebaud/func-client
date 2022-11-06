export default function useTransformIfSet<T, S>(
  value: T,
  transform: ((v: T) => S) | undefined,
) {
  return transform ? transform(value) : value;
}
