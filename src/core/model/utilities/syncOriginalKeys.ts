/* eslint-disable no-param-reassign */
import useConfig from '@/core/config/useConfig';
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function syncOriginalKeys<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
  ...keys: (keyof ModelValues<S>)[]
) {
  keys.forEach((key) => {
    if (key in instance.$values) {
      instance.$original[key] = useConfig('cloneWith', instance.constructor.$type)(instance.$values[key]);
    } else {
      delete instance.$original[key];
    }
  });
}
