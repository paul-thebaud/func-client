import filterNone from '@/json-api/utilities/filterNone';
import uniqueValues from '@/core/utilities/uniqueValues';

export default function cleanParamList<T>(...params: T[]) {
  return filterNone(uniqueValues(params)).join(',');
}
