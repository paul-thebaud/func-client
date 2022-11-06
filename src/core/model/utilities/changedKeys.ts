import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import changed from '@/core/model/utilities/changed';

export default function changedKeys<S extends ModelSchemaRaw, I>(
  instance: ModelInstance<S> & I,
) {
  return Object.keys(instance.constructor.$schema).filter(
    (key) => changed(instance, key),
  );
}
