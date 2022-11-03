import { Dictionary } from '@/core';

function appendParam(
  urlSearchParams: URLSearchParams,
  key: string,
  value: unknown,
) {
  if (value !== undefined) {
    if (Array.isArray(value)) {
      value.forEach((subValue) => appendParam(urlSearchParams, `${key}[]`, subValue));
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(
        ([subKey, subValue]) => appendParam(urlSearchParams, `${key}[${subKey}]`, subValue),
      );
    } else {
      urlSearchParams.set(key, value === null ? 'null' : String(value));
    }
  }
}

export default function serializeParams(params: Dictionary) {
  const urlSearchParams = new URLSearchParams();

  Object.entries(params || {}).forEach(([key, value]) => {
    appendParam(urlSearchParams, key, value);
  });

  const queryString = urlSearchParams.toString();

  return queryString || undefined;
}
