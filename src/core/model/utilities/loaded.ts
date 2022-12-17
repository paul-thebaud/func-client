import isInstance from '@/core/model/guards/isInstance';
import isRelationDef from '@/core/model/guards/isRelationDef';
import { ModelInstance, ModelRelationDotKey } from '@/core/model/types';
import { Arrayable } from '@/core/utilities/types';
import wrap from '@/core/utilities/wrap';

export default function loaded<I extends ModelInstance>(
  instance: I,
  relations: Arrayable<ModelRelationDotKey<I>>,
): boolean {
  return wrap(relations).every((key) => {
    const [localKey, ...relatedKeys] = key.split('.');
    const def = instance.$model.$schema[localKey];
    if (!isRelationDef(def)) {
      return false;
    }

    if (!instance.$loaded[localKey]) {
      return false;
    }

    const relatedKey = relatedKeys.join('.');
    if (!relatedKey) {
      return true;
    }

    const related = instance[localKey];
    if (Array.isArray(related)) {
      return related.every((r) => loaded<ModelInstance>(r, relatedKey));
    }

    if (isInstance(related)) {
      return loaded<ModelInstance>(related, relatedKey);
    }

    return true;
  });
}
