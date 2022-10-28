import isBidirectionalTransformer from '@/core/transformers/isBidirectionalTransformer';
import { Transformer } from '@/core/transformers/transformer';
import { Serializable } from '@/core/types/serializable/serializable';

export default async function transformFromRaw(
  transformer: Transformer,
  value: Serializable,
  params: unknown[],
) {
  if (isBidirectionalTransformer(transformer)) {
    return transformer.transform(value, params);
  }

  return transformer.transformToRaw(value, params);
}
