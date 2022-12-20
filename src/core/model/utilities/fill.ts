/* eslint-disable no-param-reassign */
import { ModelInstance, ModelValues } from '@/core/model/types';

export default function fill<I extends ModelInstance>(
  instance: I,
  values: Partial<ModelValues<I>>,
) {
  Object.entries(values).forEach(([key, value]) => {
    instance.$values[key] = value;
  });

  return instance;
}
