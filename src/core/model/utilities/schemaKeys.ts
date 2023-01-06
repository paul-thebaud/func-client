import { ModelInstance, ModelKey } from '@/core/model/types';
import { ArrayableVariadic, wrapVariadic } from '@/utilities';

export default function schemaKeys<I extends ModelInstance>(
  instance: I,
  ...keys: ArrayableVariadic<ModelKey<I>>
) {
  const wrappedKeys = wrapVariadic(...keys);
  if (wrappedKeys.length === 0) {
    return Object.keys(instance.$model.$schema) as ModelKey<I>[];
  }

  return wrappedKeys;
}
