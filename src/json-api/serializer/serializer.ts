import { ActionContext, ModelInstance, SerializerI } from '@/core';
import serializeOne from '@/json-api/serializer/serializeOne';
import { SerializerOptions } from '@/json-api/serializer/types';
import { JsonApiDocument } from '@/json-api/types';

export default class Serializer implements SerializerI<JsonApiDocument> {
  private options: SerializerOptions;

  public constructor(options: SerializerOptions) {
    this.options = options;
  }

  public async serializeMany(_context: ActionContext, instances: ModelInstance[]) {
    return {
      data: await Promise.all(instances.map(
        (instance) => serializeOne(instance, this.options),
      )),
    };
  }

  public async serializeOne(_context: ActionContext, instance: ModelInstance) {
    return {
      data: await serializeOne(instance, this.options),
    };
  }
}
