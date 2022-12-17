/* eslint-disable no-param-reassign */
import { ModelInstance, ModelKey } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { Arrayable } from '@/core/utilities/types';

export default function reset<I extends ModelInstance>(
  instance: I,
  keys?: Arrayable<ModelKey<I>>,
) {
  if (keys === undefined) {
    instance.$values = {};
  }

  schemaKeys(instance, keys).forEach((key) => {
    if (key in instance.$original) {
      instance.$values[key] = cloneModelValue(
        instance.$model,
        instance.$original[key],
      );
    } else {
      delete instance.$values[key];
    }
  });

  return instance as I;
}
