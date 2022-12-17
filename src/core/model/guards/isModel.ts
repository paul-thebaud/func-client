import { Model } from '@/core/model/types';

export default function isModel<M extends Model>(
  value: unknown,
): value is M {
  return !!value && typeof value === 'object' && (value as any).$MODEL_TYPE === 'model';
}
