import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import wasChangedKeys from '@/core/model/utilities/wasChangedKeys';

export default function wasChanged<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
) {
  wasChangedKeys(instance, ...Object.keys(instance.constructor.$schema));
}
