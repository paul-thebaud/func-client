/* eslint-disable no-param-reassign */
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';
import cloneModelValue from '@/core/model/utilities/cloneModelValue';

export default function resetKeys<S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
  ...keys: (keyof ModelValues<S>)[]
) {
  keys.forEach((key) => {
    if (key in instance.$original) {
      instance.$values[key] = cloneModelValue(instance.constructor, instance.$original[key]);
    } else {
      delete instance.$values[key];
    }
  });

  return instance as I;
}
