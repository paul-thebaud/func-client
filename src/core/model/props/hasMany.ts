import { ModelRelation } from '@/core/model/types';

export type HasManyOptions<T> = {
  default?: T;
};

export default function hasMany<T>(
  options: HasManyOptions<T[]> = {},
): ModelRelation<T[]> {
  return {
    $MODEL_TYPE: 'relation',
    default: options.default,
  };
}
