import { ModelDefinition, ModelInstance, ModelValues } from '@/core/model/types';
import compareModelValue from '@/core/model/utilities/compareModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { ArrayWrappable } from '@/core/utilities/types';

export default function changed<S extends ModelDefinition>(
  instance: ModelInstance<S>,
  keys?: ArrayWrappable<keyof ModelValues<S>>,
) {
  return schemaKeys(instance, keys).some(
    (key) => !compareModelValue(
      instance.constructor,
      instance.$values[key],
      instance.$original[key],
    ),
  );
}
