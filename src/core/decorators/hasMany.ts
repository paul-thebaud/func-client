import type Model from '@/core/model';
import { RelationshipOptions } from '@/core/types/model';

export default function hasMany(options?: Partial<RelationshipOptions>) {
  return (target: object, key: string) => {
    (target as Model).hasMany(key, options);
  };
}
