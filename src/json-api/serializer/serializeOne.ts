import { ModelInstance, wasChangedKeys } from '@/core';
import FuncModelError from '@/core/errors/funcModelError';
import isAttributeDef from '@/core/model/guards/isAttributeDef';
import isRelationDef from '@/core/model/guards/isRelationDef';
import mapSchema from '@/core/utilities/mapSchema';
import serializeAttribute from '@/json-api/serializer/serializeAttribute';
import serializeRelation from '@/json-api/serializer/serializeRelation';
import type { SerializerOptions } from '@/json-api/serializer/types';
import { JsonApiResource } from '@/json-api/types';

export default async function serializeOne(
  instance: ModelInstance,
  options: SerializerOptions,
): Promise<JsonApiResource> {
  const record = {
    type: instance.constructor.$config.type,
    id: instance.id,
    attributes: {},
    relationships: {},
  };

  await Promise.all(mapSchema(instance.constructor.$schema, async (def, key) => {
    if (options.keepUnchanged !== true && !wasChangedKeys(instance, key)) {
      return;
    }

    const value = instance.$values[key];
    if (value === undefined) {
      return;
    }

    if (isAttributeDef(def)) {
      Object.assign(record.attributes, await serializeAttribute(
        def,
        key,
        value,
        options,
      ));
    } else if (isRelationDef(def)) {
      Object.assign(record.relationships, await serializeRelation(
        def,
        key,
        value,
        options,
      ));
    } else {
      throw new FuncModelError(`Cannot serialize non attribute or relation key \`${key}\``);
    }
  }));

  return record;
}