import { ModelRelation } from '@/core/model/types';

export type HasOneOptions<T> = {
  default?: T;
};

export default function hasOne<T>(
  options: HasOneOptions<T> = {},
): ModelRelation<T> {
  return {
    $MODEL_TYPE: 'relation',
    default: options.default,
  };
}
