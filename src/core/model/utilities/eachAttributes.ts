import isAttributeDef from '@/core/model/guards/isAttributeDef';
import { ModelAttribute, ModelInstance } from '@/core/model/types';

export default function eachAttributes<R>(
  instance: ModelInstance,
  callback: (key: string, def: ModelAttribute) => R,
) {
  return Object.entries(instance.$model.$schema).reduce((stack, [key, def]) => {
    if (isAttributeDef(def)) {
      stack.push(callback(key, def));
    }

    return stack;
  }, [] as R[]);
}
