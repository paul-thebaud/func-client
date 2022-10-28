export default function resolveOnce<T, A extends any[]>(
  resolver: (...args: A) => T,
): (...args: A) => T {
  let resolved = undefined as T | undefined;

  return (...args: A) => {
    if (!resolved) {
      resolved = resolver(...args);
    }

    return resolved;
  };
}
