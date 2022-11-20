/* eslint-disable no-param-reassign */
import { ModelInstance, ModelDefinition, ModelValues } from '@/core/model/types';

export default function fill<S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
  values: Partial<ModelValues<S>>,
) {
  Object.entries(values).forEach(([key, value]) => {
    instance.$values[key as keyof ModelValues<S>] = value;
  });

  return instance as I;
}
