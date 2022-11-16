import { ModelInstance } from '@/core/model/types';

export default function isInstance<I extends ModelInstance = ModelInstance>(
  value: unknown,
): value is I {
  return !!value && typeof value === 'object' && (value as any).$MODEL_TYPE === 'instance';
}
