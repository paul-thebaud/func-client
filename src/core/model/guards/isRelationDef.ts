import { ModelRelation } from '@/core/model/types';

export default function isRelationDef(
  value: unknown,
): value is ModelRelation {
  return !!value && typeof value === 'object' && (value as any).$MODEL_TYPE === 'relation';
}
