import isAttributeDef from '@/core/model/guards/isAttributeDef';
import isRelationDef from '@/core/model/guards/isRelationDef';
import { ModelAttribute, ModelRelation } from '@/core/model/types';

export default function isPropDef(
  def: unknown,
): def is ModelAttribute<unknown, unknown> | ModelRelation<unknown> {
  return isAttributeDef(def) || isRelationDef(def);
}
