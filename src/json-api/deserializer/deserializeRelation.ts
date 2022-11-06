import { ActionContext, ModelRelation } from '@/core';
import isNil from '@/core/utilities/isNil';
import type { DeserializeOne } from '@/json-api/deserializer/deserializeOne';
import deserializeProp from '@/json-api/deserializer/deserializeProp';
import deserializeRef from '@/json-api/deserializer/deserializeRef';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import type { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiRelationships, JsonApiResourceIdentifier } from '@/json-api/types';

export default async function deserializeRelation(
  context: ActionContext,
  def: ModelRelation<unknown, unknown>,
  key: string,
  data: JsonApiRelationships,
  includedMap: JsonApiIncludedMap,
  options: JsonApiDeserializerOptions,
  deserializeOne: DeserializeOne,
) {
  const value = await deserializeProp(def, key, data, options);

  if (Array.isArray(value)) {
    return value.map((resourceRef) => deserializeRef(
      context,
      resourceRef,
      includedMap,
      options,
      deserializeOne,
    ));
  }

  if (!isNil(value)) {
    return deserializeRef(
      context,
      value as JsonApiResourceIdentifier,
      includedMap,
      options,
      deserializeOne,
    );
  }

  return value;
}