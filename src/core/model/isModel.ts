import { Model } from '@/core/model/types';

export default function isModel(value: unknown): value is Model {
  return !!value
    && typeof value === 'function'
    && '$MODEL_TYPE' in value
    && (value as any).$MODEL_TYPE === 'model';
}
