import { ActionContext } from '@/core';

export default function makeParams(context: ActionContext) {
  const urlSearchParams = new URLSearchParams();

  const appendParam = (key: string, value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach((subValue) => appendParam(`${key}[]`, subValue));
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(
        ([subKey, subValue]) => appendParam(`${key}[${subKey}]`, subValue),
      );
    } else {
      const finalValue = value;
      if (finalValue !== undefined) {
        urlSearchParams.set(key, String(finalValue));
      }
    }
  };

  Object.entries(context.params || {}).forEach(([key, value]) => {
    appendParam(key, value);
  });

  return urlSearchParams?.toString() || undefined;
}
