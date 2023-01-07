import relation, { RelationConfig } from '@/core/model/props/relation';
import { ModelRelation } from '@/core/model/types';

export type HasManyConfig<T> = RelationConfig<T>;

export default function hasMany<T>(
  config: HasManyConfig<T[]> = {},
): ModelRelation<T[]> {
  return relation('hasMany', config);
}
