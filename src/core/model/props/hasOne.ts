import prop, { PropOptions } from '@/core/model/props/prop';
import { ModelRelation } from '@/core/model/types';

export type HasOneOptions<T, S> = Omit<PropOptions<T, S>, 'transformer'>;

export default function hasOne<T, S = T>(
  options: HasOneOptions<T, S> = {},
): ModelRelation<T, S> {
  return {
    ...prop(options),
    $MODEL_TYPE: 'relation',
  };
}
