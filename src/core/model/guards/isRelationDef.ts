import { ModelProp, ModelRelation } from '@/core/model/types';

export default function isRelationDef(
  def: ModelProp<unknown, unknown>,
): def is ModelRelation<unknown, unknown> {
  return (def as any).$MODEL_TYPE === 'relation';
}
