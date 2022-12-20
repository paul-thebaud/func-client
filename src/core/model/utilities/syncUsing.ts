/* eslint-disable no-param-reassign */
import { ModelInstance, ModelKey } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { Arrayable } from '@/core/utilities/types';

export default function syncUsing<I extends ModelInstance>(
  source: '$original' | '$values',
  target: '$original' | '$values',
  instance: I,
  keys?: Arrayable<ModelKey<I>>,
) {
  if (keys === undefined) {
    instance[target] = {};
  }

  schemaKeys(instance, keys).forEach((key) => {
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
