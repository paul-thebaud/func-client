import Model, { RelationshipOptions } from '@/core/model';

export default function belongsTo(options?: Partial<RelationshipOptions>) {
  return (target: object, key: string) => {
    (target as Model).belongsTo(key, options);
  };
}
