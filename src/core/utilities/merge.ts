/* eslint-disable no-param-reassign */
import { Dictionary, UnionToIntersection } from '@/core/utilities/types';

export function isObject(obj: unknown): obj is object {
  return !!obj && typeof obj === 'object' && !Array.isArray(obj);
}

export default function merge<T extends Dictionary[]>(
  ...objects: T
): UnionToIntersection<T[number]> {
  return objects.reduce((result, current) => {
    if (Array.isArray(current)) {
      throw new Error('only objects are supported by merge()');
    }

    Object.keys(current).forEach((key) => {
      if (isObject(result[key]) && isObject(current[key])) {
        result[key] = merge(result[key] as Dictionary, current[key] as Dictionary);
      } else {
        result[key] = current[key];
      }
    });

    return result;
  }, {}) as any;
}
