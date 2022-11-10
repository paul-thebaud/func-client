/* eslint-disable no-param-reassign */
import { ModelInstance, ModelSchemaRaw } from '@/core/model/types';
import resetKeys from '@/core/model/utilities/resetKeys';

export default function reset<S extends ModelSchemaRaw>(
  instance: ModelInstance<S>,
) {
  instance.$values = {};

  resetKeys(instance, ...Object.keys(instance.$original));
}