/* eslint-disable no-param-reassign */
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import syncOriginalKeys from '@/core/model/utilities/syncOriginalKeys';

export default function syncOriginal<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
) {
  instance.$original = {};

  syncOriginalKeys(instance, ...Object.keys(instance.$values));
}
