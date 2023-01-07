import { excludeNone, uniqueValues } from '@/utilities';

/**
 * Merge a JSON:API formatted param's list.
 *
 * @param params
 */
export default function mergeParamList<T>(params: T[]) {
  return excludeNone(uniqueValues(params)).join(',');
}
