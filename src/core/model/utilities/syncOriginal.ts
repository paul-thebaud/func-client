/* eslint-disable no-param-reassign */
import { ModelInstance, ModelDefinition } from '@/core/model/types';
import syncOriginalKeys from '@/core/model/utilities/syncOriginalKeys';

export default function syncOriginal<S extends ModelDefinition, I>(
  instance: ModelInstance<S> & I,
) {
  instance.$original = {};

  syncOriginalKeys(instance, Object.keys(instance.$values));

  return instance as I;
}
