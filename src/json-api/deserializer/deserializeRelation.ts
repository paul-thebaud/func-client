import { ActionContext, ModelRelation } from '@/core';
import isNil from '@/core/utilities/isNil';
import type { DeserializeOne } from '@/json-api/deserializer/deserializeOne';
import deserializeProp from '@/json-api/deserializer/deserializeProp';
import deserializeRef from '@/json-api/deserializer/deserializeRef';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import type { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiRelationship, JsonApiRelationships, JsonApiResourceIdentifier } from '@/json-api/types';

function deserializeRelationValue(
  context: ActionContext,
  data: JsonApiResourceIdentifier[] | JsonApiResourceIdentifier | null,
  includedMap: JsonApiIncludedMap,
  options: JsonApiDeserializerOptions,
  deserializeOne: DeserializeOne,
) {
  if (Array.isArray(data)) {
    return Promise.all(data.map((resourceRef) => deserializeRef(
      context,
      resourceRef,
      includedMap,
      options,
      deserializeOne,
    )));
  }

  if (!isNil(data)) {
    return deserializeRef(
      context,
      data,
      includedMap,
      options,
      deserializeOne,
    );
  }

  return null;
}

export default async function deserializeRelation(
  context: ActionContext,
  def: ModelRelation<unknown, unknown>,
  key: string,
  data: JsonApiRelationships,
  includedMap: JsonApiIncludedMap,
  options: JsonApiDeserializerOptions,
  deserializeOne: DeserializeOne,
) {
  const value = await deserializeProp(def, key, data, options) as JsonApiRelationship | undefined;
  if (value === undefined || value.data === undefined) {
    return {};
  }

  return {
    [key]: await deserializeRelationValue(
      context,
      value.data,
      includedMap,
      options,
      deserializeOne,
    ),
  };
}
