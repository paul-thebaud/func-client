import { ModelProp } from '@/core/model/types';
import { DeserializerOptions } from '@/json-api/deserializer/types';

export default function deserializeKey(
  def: ModelProp<unknown, unknown>,
  key: string,
  options: DeserializerOptions,
) {
  if (def.alias !== undefined) {
    return def.alias;
  }

  if (options.transformKeys) {
    return options.transformKeys(key);
  }

  return key;
}
