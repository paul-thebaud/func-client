/* eslint-disable no-param-reassign */
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function syncOriginalKeys<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
  ...keys: (keyof ModelValues<S>)[]
) {
  keys.forEach((key) => {
    if (key in instance.$values) {
      instance.$original[key] = instance.$values[key];
    } else {
      delete instance.$original[key];
    }
  });
}
