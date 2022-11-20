/* eslint-disable no-param-reassign */
import { ModelDefinition, ModelInstance, ModelValues } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import arrayWrap from '@/core/utilities/arrayWrap';
import { ArrayWrappable } from '@/core/utilities/types';

export default function resetKeys<S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
  keys: ArrayWrappable<keyof ModelValues<S>>,
) {
  arrayWrap(keys).forEach((key) => {
    if (key in instance.$original) {
      instance.$values[key] = cloneModelValue(instance.constructor, instance.$original[key]);
    } else {
      delete instance.$values[key];
    }
  });

  return instance as I;
}
