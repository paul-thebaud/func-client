import { ModelInstance, ModelSchemaRaw, ModelValues } from '@/core/model/types';
import compareModelValue from '@/core/model/utilities/compareModelValue';

export default function wasChangedKeys<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
  ...keys: (keyof ModelValues<S>)[]
) {
  return keys.some(
    (key) => !compareModelValue(
      instance.constructor,
      instance.$values[key],
      instance.$original[key],
    ),
  );
}
