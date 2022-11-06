/* eslint-disable no-param-reassign */
import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';

export default function fill<S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
  values: Partial<ModelValues<S>>,
) {
  Object.entries(values).forEach(([key, value]) => {
    instance.$values[key as keyof ModelValues<S>] = value;
  });

  return instance as I;
}
