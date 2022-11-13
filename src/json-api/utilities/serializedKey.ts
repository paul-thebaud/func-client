import { ModelProp } from '@/core/model/types';

export default function serializedKey(
  def: ModelProp<unknown, unknown>,
  key: string,
  options: { transformKeys?: (localKey: string) => string },
) {
  if (def.alias !== undefined) {
    return def.alias;
  }

  if (options.transformKeys) {
    return options.transformKeys(key);
  }

  return key;
}
