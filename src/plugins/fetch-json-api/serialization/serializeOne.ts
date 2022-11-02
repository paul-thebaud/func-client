import { ModelInstance } from '@/core/model/types';
import { Dictionary } from '@/core/utilities/types';
import { JsonApiRecordRef } from '@/plugins/fetch-json-api/types';

function serializeRef(model: ModelInstance): JsonApiRecordRef {
  return {
    type: model.constructor.$type,
    id: model.id,
  };
}

export default async function serializeOne(model: ModelInstance) {
  const record = {
    type: model.constructor.$type,
    id: model.id,
    attributes: {} as Dictionary,
    relationships: {} as Dictionary<{ data: JsonApiRecordRef[] | JsonApiRecordRef | null }>,
  };

  await Promise.all(Object.entries(model.constructor.$schema).map(async ([key, def]) => {
    // TODO Diff here?
    if (def.$MODEL_TYPE === 'attribute') {
      // TODO Cast.
      record.attributes[key] = model.$values[key];
    } else if (def.$MODEL_TYPE === 'relation') {
      const relatedRefs = model.$values[key];
      if (relatedRefs === null) {
        record.relationships[key] = { data: null };
      } else if (Array.isArray(relatedRefs)) {
        record.relationships[key] = { data: relatedRefs.map((r) => serializeRef(r)) };
      } else if (relatedRefs) {
        record.relationships[key] = { data: serializeRef(relatedRefs as ModelInstance) };
      }
    }
  }));

  return record;
}
