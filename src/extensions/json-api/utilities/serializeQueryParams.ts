import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';

function appendQueryParam(queryParams: URLSearchParams, key: string, value: Serializable) {
  if (value !== undefined) {
    if (Array.isArray(value)) {
      value.forEach((subValue) => appendQueryParam(queryParams, `${key}[]`, subValue));
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(
        ([subKey, subValue]) => appendQueryParam(queryParams, `${key}[${subKey}]`, subValue),
      );
    } else {
      queryParams.set(key, value === null ? 'null' : String(value));
    }
  }
}

export default function serializeQueryParams(queryParamsObject: Dictionary<Serializable>) {
  const queryParams = new URLSearchParams();

  Object.entries(queryParamsObject || {}).forEach(([key, value]) => {
    appendQueryParam(queryParams, key, value);
  });

  const queryString = queryParams.toString();

  return queryString || undefined;
}
