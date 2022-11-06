import { ActionContext, ModelInstance } from '@/core';
import serializeMany from '@/json-api/serializer/serializeMany';
import serializeOne from '@/json-api/serializer/serializeOne';

export type JsonApiSerializerOptions = {
  transformKeys?: (localKey: string) => string;
};

export default function makeSerializer(
  options: JsonApiSerializerOptions = {},
) {
  return {
    async serializeOne(_context: ActionContext, model: ModelInstance) {
      return {
        data: await serializeOne(model, options),
      };
    },
    async serializeMany(_context: ActionContext, models: ModelInstance[]) {
      return {
        data: await serializeMany(models, options),
      };
    },
  };
}
