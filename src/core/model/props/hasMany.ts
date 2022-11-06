import prop, { OptionsVariadic, PropOptions } from '@/core/model/props/prop';
import { ModelRelation } from '@/core/model/types';

export type HasManyOptions<T, S> = PropOptions<T, S>;

export default function hasMany<T, S = T>(
  ...options: OptionsVariadic<T[], S[], HasManyOptions<T[], S[]>>
): ModelRelation<T[], S[]> {
  return {
    ...prop(...options),
    $MODEL_TYPE: 'relation',
  };
}
