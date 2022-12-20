import { ModelAttribute } from '@/core/model/types';

export default function isAttributeDef(
  value: unknown,
): value is ModelAttribute<unknown, unknown> {
  return !!value && typeof value === 'object' && (value as any).$MODEL_TYPE === 'attribute';
}
