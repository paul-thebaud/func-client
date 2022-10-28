import isBidirectionalTransformer from '@/core/transformers/isBidirectionalTransformer';
import { Transformer } from '@/core/transformers/transformer';
import { Serializable } from '@/core/types/serializable/serializable';

export default async function transformToRaw(
  transformer: Transformer,
  value: unknown,
  params: unknown[],
) {
  if (isBidirectionalTransformer(transformer)) {
    return transformer.transform(value as Serializable, params);
  }

  return transformer.transformToRaw(value, params);
}
