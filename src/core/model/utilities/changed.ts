import { ModelInstance, ModelKey } from '@/core/model/types';
import compareModelValue from '@/core/model/utilities/compareModelValue';
import schemaKeys from '@/core/model/utilities/schemaKeys';
import { ArrayableVariadic } from '@/utilities';

export default function changed<I extends ModelInstance>(
  instance: I,
  ...keys: ArrayableVariadic<ModelKey<I>>
) {
  return schemaKeys(instance, ...keys).some(
    (key) => !compareModelValue(
      instance.$model,
      instance.$values[key],
      instance.$original[key],
    ),
  );
}
