import { excludeNone, uniqueValues } from '@/utilities';

export default function mergeParamList<T>(params: T[]) {
  return excludeNone(uniqueValues(params)).join(',');
}
