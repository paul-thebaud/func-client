import { BidirectionalTransformer, Transformer } from '@/core/transformers/transformer';

export default function isBidirectionalTransformer(
  transformer: Transformer,
): transformer is BidirectionalTransformer {
  return 'transform' in transformer;
}
