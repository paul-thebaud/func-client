import { ModelInstance, ModelKey } from '@/core/model/types';
import syncUsing from '@/core/model/utilities/syncUsing';
import { ArrayableVariadic } from '@/utilities';

export default function reset<I extends ModelInstance>(
  instance: I,
  ...keys: ArrayableVariadic<ModelKey<I>>
) {
  return syncUsing('$original', '$values', instance, ...keys);
}
