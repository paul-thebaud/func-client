import useConfig from '@/core/config/useConfig';
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function wasChangedKeys<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
  ...keys: (keyof ModelValues<S>)[]
) {
  return keys.some(
    (key) => !useConfig('compareWith', instance.constructor.$type)(
      instance.$values[key],
      instance.$original[key],
    ),
  );
}
