import { ActionContext, DeserializerI, FuncModelError } from '@/core';
import isNil from '@/core/utilities/isNil';
import deserializeOne from '@/json-api/deserializer/deserializeOne';
import prepareDeserializationData from '@/json-api/deserializer/prepareDeserializationData';
import { DeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiDocument } from '@/json-api/types';

export default class Deserializer implements DeserializerI<JsonApiDocument> {
  private readonly options: DeserializerOptions;

  public constructor(options: DeserializerOptions) {
    this.options = options;
  }

  public async deserializeOne(context: ActionContext, document: JsonApiDocument) {
    if (Array.isArray(document.data)) {
      throw new FuncModelError('Cannot deserialize array JSON:API resources to one');
    }

    if (isNil(document.data)) {
      return document.data;
    }

    return deserializeOne(
      context,
      document.data,
      prepareDeserializationData([document.data], document.included ?? []),
      this.options,
    );
  }

  public async deserializeMany(context: ActionContext, document: JsonApiDocument) {
    if (!Array.isArray(document.data)) {
      throw new FuncModelError('Cannot deserialize non array JSON:API resources to many');
    }

    const deserializationData = prepareDeserializationData(document.data, document.included ?? []);

    return Promise.all(document.data.map(
      (resource) => deserializeOne(context, resource, deserializationData, this.options),
    ));
  }
}
