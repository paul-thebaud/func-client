import { ModelDefinition, ModelInstance, ModelKey } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';
import { Arrayable } from '@/core/utilities/types';
import wrap from '@/core/utilities/wrap';

export default function schemaKeys<S extends ModelDefinition>(
  instance: ModelInstance<S>,
  keys?: Arrayable<ModelKey<S>>,
) {
  if (!isNil(keys)) {
    return wrap(keys);
  }

  return Object.keys(instance.constructor.$schema);
}
