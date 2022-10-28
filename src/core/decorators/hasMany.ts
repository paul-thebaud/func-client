import Model, { RelationshipOptions } from '@/core/model';

export default function hasMany(options?: Partial<RelationshipOptions>) {
  return (target: object, key: string) => {
    (target as Model).hasMany(key, options);
  };
}
