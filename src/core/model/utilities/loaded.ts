import isInstance from '@/core/model/guards/isInstance';
import isRelationDef from '@/core/model/guards/isRelationDef';
import { ModelInstance, ModelRelationDotKey } from '@/core/model/types';
import { ArrayableVariadic, wrapVariadic } from '@/utilities';

export default function loaded<I extends ModelInstance>(
  instance: I,
  ...relations: ArrayableVariadic<ModelRelationDotKey<I>>
): boolean {
  return wrapVariadic(...relations).every((key) => {
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
