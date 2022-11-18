import relation, { RelationOptions } from '@/core/model/props/relation';
import { ModelRelation } from '@/core/model/types';

export type HasManyOptions<T> = RelationOptions<T>;

export default function hasMany<T>(
  options: HasManyOptions<T[]> = {},
): ModelRelation<T[]> {
  return relation('hasMany', options);
}
