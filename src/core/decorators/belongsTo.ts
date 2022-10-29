import type Model from '@/core/model';
import { RelationshipOptions } from '@/core/types/model';

export default function belongsTo(options?: Partial<RelationshipOptions>) {
  return (target: object, key: string) => {
    (target as Model).belongsTo(key, options);
  };
}
