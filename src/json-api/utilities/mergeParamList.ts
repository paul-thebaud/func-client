import uniqueValues from '@/core/utilities/uniqueValues';
import excludeNone from '@/json-api/utilities/excludeNone';

export default function mergeParamList<T>(params: T[]) {
  return excludeNone(uniqueValues(params)).join(',');
}
