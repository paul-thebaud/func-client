/* eslint-disable no-param-reassign */
import { ModelInstance, ModelKey } from '@/core/model/types';
import syncUsing from '@/core/model/utilities/syncUsing';
import { Arrayable } from '@/core/utilities/types';

export default function syncOriginal<I extends ModelInstance>(
  instance: I,
  keys?: Arrayable<ModelKey<I>>,
) {
  return syncUsing('$values', '$original', instance, keys);
}
