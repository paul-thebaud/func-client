import { ModelInstance } from '@/core/model/types';

export default function isInstance(
  value: unknown,
): value is ModelInstance {
  return !!value && typeof value === 'object' && (value as any).$MODEL_TYPE === 'instance';
}
