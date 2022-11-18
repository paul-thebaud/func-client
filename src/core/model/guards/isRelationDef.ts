import { ModelProp, ModelRelation } from '@/core/model/types';

export default function isRelationDef(
  def: ModelProp<unknown>,
): def is ModelRelation<unknown> {
  return (def as any).$MODEL_TYPE === 'relation';
}
