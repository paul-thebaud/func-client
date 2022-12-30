import { ModelProp } from '@/core';
import value from '@/core/utilities/value';

export type SerializesKeysOptions = {
  transformKeys?: (localKey: string) => string;
};

export default function serializedKey(
  def: ModelProp,
  key: string,
  options: SerializesKeysOptions,
) {
  if (def.alias !== undefined) {
    return value(def.alias);
  }

  if (options.transformKeys) {
    return options.transformKeys(key);
  }

  return key;
}
