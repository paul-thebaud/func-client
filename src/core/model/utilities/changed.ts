import useConfig from '@/core/config/useConfig';
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function changed<S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
  key: keyof ModelValues<S>,
) {
  return !useConfig('compareWith', instance.constructor.$type)(
    instance.$values[key],
    instance.$original[key],
  );
}
