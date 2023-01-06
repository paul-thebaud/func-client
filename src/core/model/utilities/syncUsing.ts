/* eslint-disable no-param-reassign */
import { ModelInstance, ModelKey } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { ArrayableVariadic, wrapVariadic } from '@/utilities';

export default function syncUsing<I extends ModelInstance>(
  source: '$original' | '$values',
  target: '$original' | '$values',
  instance: I,
  ...keys: ArrayableVariadic<ModelKey<I>>
) {
  const wrappedKeys = wrapVariadic(...keys);
  if (wrappedKeys.length === 0) {
    instance[target] = {};
  }

  schemaKeys(instance, wrappedKeys).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(instance[source], key)) {
      instance[target][key] = cloneModelValue(
        instance.$model,
        instance[source][key],
      );
    } else {
      delete instance[target][key];
    }
  });

  return instance;
}
