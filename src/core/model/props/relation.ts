import { ModelProp, ModelRelation, ModelRelationType } from '@/core/model/types';

export type RelationOptions<T> = ModelProp<T>;

export default function relation<T>(
  relationType: ModelRelationType,
  options: RelationOptions<T> = {},
): ModelRelation<T> {
  return {
    $MODEL_TYPE: 'relation',
    $RELATION_TYPE: relationType,
    ...options,
  };
}
