import { ModelInstance, ModelDefinition } from '@/core/model/types';
import changedKeys from '@/core/model/utilities/changedKeys';

export default function changed<S extends ModelDefinition>(
  instance: ModelInstance<S>,
) {
  return changedKeys(instance, Object.keys(instance.constructor.$schema));
}
