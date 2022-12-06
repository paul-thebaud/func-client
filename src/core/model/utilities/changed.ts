import { ModelDefinition, ModelInstance, ModelKey } from '@/core/model/types';
import compareModelValue from '@/core/model/utilities/compareModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { Arrayable } from '@/core/utilities/types';

export default function changed<S extends ModelDefinition>(
  instance: ModelInstance<S>,
  keys?: Arrayable<ModelKey<S>>,
) {
  return schemaKeys(instance, keys).some(
    (key) => !compareModelValue(
      instance.constructor,
      instance.$values[key],
      instance.$original[key],
    ),
  );
}
