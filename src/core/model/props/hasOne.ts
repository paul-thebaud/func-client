import prop, { OptionsVariadic, PropOptions } from '@/core/model/props/prop';
import { ModelRelation } from '@/core/model/types';

export type HasOneOptions<T, S> = PropOptions<T, S>;

export default function hasOne<T, S = T>(
  ...options: OptionsVariadic<T, S, HasOneOptions<T, S>>
): ModelRelation<T, S> {
  return {
    ...prop(...options),
    $MODEL_TYPE: 'relation',
  };
}
