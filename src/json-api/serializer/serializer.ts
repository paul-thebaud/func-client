import { ActionContext, ModelInstance, SerializerI } from '@/core';
import serializeOne from '@/json-api/serializer/serializeOne';
import { SerializerOptions } from '@/json-api/serializer/types';
import { JsonApiDocument } from '@/json-api/types';

export default class Serializer implements SerializerI<JsonApiDocument> {
  private readonly options: SerializerOptions;

  public constructor(options: SerializerOptions) {
    this.options = options;
  }

  public async serialize(_context: ActionContext, instance: ModelInstance) {
    return {
      data: await serializeOne(instance, this.options),
    };
  }
}
