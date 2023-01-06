import { ModelInstance, ModelProp } from '@/core';
import { value } from '@/utilities';

export default function normalizeKey(
  instance: ModelInstance,
  key: string,
  def: ModelProp,
) {
  if (def.alias) {
    return value(def.alias, instance, key);
  }

  // TODO Model configuration or passed option?

  return key;
}
