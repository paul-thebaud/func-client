/* eslint-disable no-param-reassign */
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import syncOriginalKeys from '@/core/model/utilities/syncOriginalKeys';

export default function reset<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
) {
  instance.$values = {};

  syncOriginalKeys(instance, ...Object.keys(instance.$original));
}
