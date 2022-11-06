import { ActionContext, FuncModelError } from '@/core';
import deserializeMany from '@/json-api/deserializer/deserializeMany';
import deserializeOne from '@/json-api/deserializer/deserializeOne';
import makeIncludedMap from '@/json-api/deserializer/makeIncludedMap';
import { JsonApiDeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiDocument } from '@/json-api/types';

export default function makeDeserializer(
  options: JsonApiDeserializerOptions = {},
) {
  return {
    async deserializeOne(context: ActionContext, document: JsonApiDocument) {
      if (Array.isArray(document.data)) {
        throw new FuncModelError('Cannot deserialize array JSON:API resources to one');
      }

      if (document.data === undefined) {
        return undefined;
      }

      if (document.data === null) {
        return null;
      }

      return deserializeOne(
        context,
        document.data,
        makeIncludedMap(document.included ?? []),
        options,
      );
    },
    async deserializeMany(context: ActionContext, document: JsonApiDocument) {
      if (!Array.isArray(document.data)) {
        throw new FuncModelError('Cannot deserialize non array JSON:API resources to many');
      }

      return deserializeMany(
        context,
        document.data,
        makeIncludedMap(document.included ?? []),
        options,
      );
    },
  };
}
