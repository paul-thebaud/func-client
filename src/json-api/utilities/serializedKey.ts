import { ModelProp } from '@/core/model/types';

export type SerializesKeysOptions = {
  transformKeys?: (localKey: string) => string;
};

export default function serializedKey(
  def: ModelProp<unknown>,
  key: string,
  options: SerializesKeysOptions,
) {
  if (def.alias !== undefined) {
    return def.alias;
  }

  if (options.transformKeys) {
    return options.transformKeys(key);
  }

  return key;
}
