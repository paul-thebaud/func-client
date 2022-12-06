/* eslint-disable no-param-reassign */
import { ModelDefinition, ModelInstance, ModelKey } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { Arrayable } from '@/core/utilities/types';

export default function reset<S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
  keys?: Arrayable<ModelKey<S>>,
) {
  if (keys === undefined) {
    instance.$values = {};
  }

  schemaKeys(instance, keys).forEach((key) => {
    if (key in instance.$original) {
      instance.$values[key] = cloneModelValue(
        instance.constructor,
        instance.$original[key],
      );
    } else {
      delete instance.$values[key];
    }
  });

  return instance as I;
}
