import excludeNone from '@/json-api/utilities/excludeNone';
import uniqueValues from '@/core/utilities/uniqueValues';

export default function mergeParamList<T>(...params: T[]) {
  return excludeNone(uniqueValues(params)).join(',');
}
