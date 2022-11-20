import { ModelDefinition, ModelInstance, ModelValues } from '@/core/model/types';
import compareModelValue from '@/core/model/utilities/compareModelValue';
import arrayWrap from '@/core/utilities/arrayWrap';
import { ArrayWrappable } from '@/core/utilities/types';

export default function changedKeys<S extends ModelDefinition>(
  instance: ModelInstance<S>,
  keys: ArrayWrappable<keyof ModelValues<S>>,
) {
  return arrayWrap(keys).some(
    (key) => !compareModelValue(
      instance.constructor,
      instance.$values[key],
      instance.$original[key],
    ),
  );
}
