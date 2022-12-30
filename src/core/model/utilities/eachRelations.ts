import isRelationDef from '@/core/model/guards/isRelationDef';
import { ModelInstance, ModelRelation } from '@/core/model/types';

export default function eachRelations<R>(
  instance: ModelInstance,
  callback: (key: string, def: ModelRelation) => R,
) {
  return Object.entries(instance.$model.$schema).reduce((stack, [key, def]) => {
    if (isRelationDef(def)) {
      stack.push(callback(key, def));
    }

    return stack;
  }, [] as R[]);
}
