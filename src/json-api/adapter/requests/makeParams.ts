import { ActionContext } from '@/core';
import { JsonApiAdapterOptions } from '@/json-api/adapter/types';
import useTransformIfSet from '@/json-api/useTransformIfSet';

export default function makeParams(context: ActionContext, options: JsonApiAdapterOptions) {
  const urlSearchParams = new URLSearchParams();

  const appendParam = (key: string, value: unknown) => {
    if (Array.isArray(value)) {
      value.forEach((subValue) => appendParam(`${key}[]`, subValue));
    } else if (value && typeof value === 'object') {
      Object.entries(value).forEach(
        ([subKey, subValue]) => appendParam(`${key}[${subKey}]`, subValue),
      );
    } else {
      const transformedParamKey = useTransformIfSet(key, options.transformParamKeys);
      const transformedParamValue = useTransformIfSet(value, options.transformParamValues);
      if (transformedParamValue !== undefined) {
        urlSearchParams.set(transformedParamKey, String(transformedParamValue));
      }
    }
  };

  Object.entries(context.params || {}).forEach(([key, value]) => {
    appendParam(key, value);
  });

  return urlSearchParams?.toString() || undefined;
}
