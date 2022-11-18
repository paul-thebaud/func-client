import relation, { RelationOptions } from '@/core/model/props/relation';
import { ModelRelation } from '@/core/model/types';

export type HasOneOptions<T> = RelationOptions<T>;

export default function hasOne<T>(
  options: HasOneOptions<T> = {},
): ModelRelation<T> {
  return relation('hasOne', options);
}
