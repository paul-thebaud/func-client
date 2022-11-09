/* eslint-disable no-param-reassign */
import useConfig from '@/core/config/useConfig';
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function resetKeys<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
  ...keys: (keyof ModelValues<S>)[]
) {
  keys.forEach((key) => {
    if (key in instance.$original) {
      instance.$values[key] = useConfig('cloneWith', instance.constructor.$type)(instance.$original[key]);
    } else {
      delete instance.$values[key];
    }
  });
}
