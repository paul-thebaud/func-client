import { ModelInstance } from '@/core';
import changed from '@/core/model/utilities/changed';
import serializeAttribute from '@/json-api/serializer/serializeAttribute';
import serializeRelation from '@/json-api/serializer/serializeRelation';
import type { JsonApiSerializerOptions } from '@/json-api/serializer/types';
import { JsonApiResource } from '@/json-api/types';

export default async function serializeOne(
  model: ModelInstance,
  options: JsonApiSerializerOptions,
): Promise<JsonApiResource> {
  const record = {
    type: model.constructor.$type,
    id: model.id,
    attributes: {},
    relationships: {},
  };

  await Promise.all(Object.entries(model.constructor.$schema).map(async ([key, def]) => {
    if (!(key in model.$values)) {
      return;
    }

    if (options.keepUnchanged !== true && !changed(model, key)) {
      return;
    }

    if (def.$MODEL_TYPE === 'attribute') {
      Object.assign(record.attributes, await serializeAttribute(
        def,
        key,
        model.$values[key],
        options,
      ));
    } else if (def.$MODEL_TYPE === 'relation') {
      Object.assign(record.relationships, await serializeRelation(
        def,
        key,
        model.$values[key],
        options,
      ));
    }
  }));

  return record;
}
