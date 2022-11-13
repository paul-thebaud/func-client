import { FuncModelError } from '@/core';
import { ActionContext } from '@/core/actions/types';
import { DeserializerI } from '@/core/types';
import isNil from '@/core/utilities/isNil';
import deserializeOne from '@/json-api/deserializer/deserializeOne';
import makeIncludedMap from '@/json-api/deserializer/makeIncludedMap';
import { DeserializerOptions } from '@/json-api/deserializer/types';
import { JsonApiDocument } from '@/json-api/types';

export default class Deserializer implements DeserializerI<JsonApiDocument> {
  private options: DeserializerOptions;

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
      makeIncludedMap(document.included ?? []),
      this.options,
    );
  }

  public async deserializeMany(context: ActionContext, document: JsonApiDocument) {
    if (!Array.isArray(document.data)) {
      throw new FuncModelError('Cannot deserialize non array JSON:API resources to many');
    }

    const includedMap = makeIncludedMap(document.included ?? []);

    return Promise.all(document.data.map(
      (resource) => deserializeOne(context, resource, includedMap, this.options),
    ));
  }
}
