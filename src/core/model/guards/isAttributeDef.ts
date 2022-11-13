import { ModelAttribute, ModelProp } from '@/core/model/types';

export default function isAttributeDef(
  def: ModelProp<unknown, unknown>,
): def is ModelAttribute<unknown, unknown> {
  return (def as any).$MODEL_TYPE === 'attribute';
}
