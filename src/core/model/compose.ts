import { UnionToIntersection } from '@/core/utilities/types';

export default function compose<T extends object[]>(
  ...extensions: T
) {
  const base = extensions.shift();

  return Object.defineProperties(
    base,
    extensions.reduce((aggregate: PropertyDescriptorMap, extension) => ({
      ...aggregate,
      ...Object.getOwnPropertyDescriptors(extension),
    }), {}),
  ) as UnionToIntersection<T[number]>;
}
