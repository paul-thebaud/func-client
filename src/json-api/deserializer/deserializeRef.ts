import { ActionContext, FuncModelError } from '@/core';
import type { DeserializeOne } from '@/json-api/deserializer/deserializeOne';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import type { DeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiResourceIdentifier } from '@/json-api/types';

export default function deserializeRef(
  context: ActionContext,
  resourceIdentifier: JsonApiResourceIdentifier,
  includedMap: JsonApiIncludedMap,
  options: DeserializerOptions,
  deserializeOne: DeserializeOne,
) {
  const includedMapOfType = includedMap.get(resourceIdentifier.type);

  const includedData = includedMapOfType?.get(resourceIdentifier.id);
  if (includedData) {
    if ('$MODEL_TYPE' in includedData) {
      return includedData;
    }

    return deserializeOne(context, includedData, includedMap, options);
  }

  throw new FuncModelError(
    `Cannot deserialize related resource \`${resourceIdentifier.type}\` with id \`${resourceIdentifier.id}\`. It does not exists in included resources.`,
  );
}
