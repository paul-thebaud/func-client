import { ModelDefinition, ModelInstance, ModelValues } from '@/core/model/types';
import arrayWrap from '@/core/utilities/arrayWrap';
import isNil from '@/core/utilities/isNil';
import { ArrayWrappable } from '@/core/utilities/types';

export default function schemaKeys<S extends ModelDefinition>(
  instance: ModelInstance<S>,
  keys?: ArrayWrappable<keyof ModelValues<S>>,
) {
  if (!isNil(keys)) {
    return arrayWrap(keys);
  }

  return Object.keys(instance.constructor.$schema);
}
