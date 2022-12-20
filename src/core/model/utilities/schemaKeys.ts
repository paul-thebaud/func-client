import { ModelInstance, ModelKey } from '@/core/model/types';
import isNil from '@/core/utilities/isNil';
import { Arrayable } from '@/core/utilities/types';
import wrap from '@/core/utilities/wrap';

export default function schemaKeys<I extends ModelInstance>(
  instance: I,
  keys?: Arrayable<ModelKey<I>>,
) {
  if (!isNil(keys)) {
    return wrap(keys);
  }

  return Object.keys(instance.$model.$schema) as ModelKey<I>[];
}
