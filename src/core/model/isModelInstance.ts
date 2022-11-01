import { ModelInstance } from '@/core/model/types';

export default function isModelInstance(value: unknown): value is ModelInstance {
  return !!value
    && typeof value === 'function'
    && '$MODEL_TYPE' in value
    && (value as any).$MODEL_TYPE === 'instance';
}
