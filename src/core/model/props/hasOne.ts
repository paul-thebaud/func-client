import relation, { RelationConfig } from '@/core/model/props/relation';
import { ModelRelation } from '@/core/model/types';

export type HasOneConfig<T> = RelationConfig<T>;

export default function hasOne<T>(
  config: HasOneConfig<T> = {},
): ModelRelation<T> {
  return relation('hasOne', config);
}
