/* eslint-disable no-param-reassign */
import { ModelDefinition, ModelInstance, ModelValues } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';
import arrayWrap from '@/core/utilities/arrayWrap';
import { ArrayWrappable } from '@/core/utilities/types';

export default function syncOriginalKeys<S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
  keys: ArrayWrappable<keyof ModelValues<S>>,
) {
  arrayWrap(keys).forEach((key) => {
    if (key in instance.$values) {
      instance.$original[key] = cloneModelValue(instance.constructor, instance.$values[key]);
    } else {
      delete instance.$original[key];
    }
  });

  return instance as I;
}
