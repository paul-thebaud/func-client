/* eslint-disable no-param-reassign */
import { ModelDefinition, ModelInstance, ModelKey } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { Arrayable } from '@/core/utilities/types';

export default function syncOriginal<S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
  keys?: Arrayable<ModelKey<S>>,
) {
  if (keys === undefined) {
    instance.$original = {};
  }

  schemaKeys(instance, keys).forEach((key) => {
    if (key in instance.$values) {
      instance.$original[key] = cloneModelValue(
        instance.constructor,
        instance.$values[key],
      );
    } else {
      delete instance.$original[key];
    }
  });

  return instance as I;
}
