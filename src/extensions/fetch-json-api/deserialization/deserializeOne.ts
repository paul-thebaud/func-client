import isModelInstance from '@/core/model/isModelInstance';
import { ModelInstance } from '@/core/model/types';
import { JsonApiIncludedMap } from '@/extensions/fetch-json-api/deserialization/makeIncludedMap';
import { DeserializeOptions } from '@/extensions/fetch-json-api/deserialization/types';
import { JsonApiRecord, JsonApiRecordRef } from '@/extensions/fetch-json-api/types';

function includedOfTypeMap(
  recordRef: JsonApiRecordRef,
  included: JsonApiIncludedMap,
) {
  const includedOfType = included.get(recordRef.type);
  if (!includedOfType) {
    // TODO
    throw new Error();
  }

  return includedOfType;
}

async function deserializeRelated(
  recordRef: JsonApiRecordRef,
  included: JsonApiIncludedMap,
  options: DeserializeOptions,
) {
  const includedOfType = includedOfTypeMap(recordRef, included);
  const instanceOrRecord = includedOfType.get(recordRef.id);
  if (!instanceOrRecord) {
    // TODO
    throw new Error();
  }

  if (isModelInstance(instanceOrRecord)) {
    return instanceOrRecord;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return deserializeOne(instanceOrRecord, included, options);
}

export default async function deserializeOne(
  record: JsonApiRecord,
  included: JsonApiIncludedMap,
  options: DeserializeOptions,
) {
  // TODO Retrieve existing from store.
  const ModelClass = await options.store.modelFor(record.type);
  const instance = new ModelClass();

  instance.id = record.id || instance.id;

  const includedOfType = included.get(record.type);
  if (includedOfType) {
    includedOfType.set(instance.id, instance);
  }

  const attributes = record.attributes || {};
  const relationships = record.relationships || {};

  await Promise.all((Object.entries(ModelClass.$schema)).map(async ([key, def]) => {
    if (def.$MODEL_TYPE === 'attribute') {
      if (key in attributes) {
        // TODO Cast.
        instance.$values[key] = attributes[key];
      }
    } else if (def.$MODEL_TYPE === 'relation') {
      if (key in relationships && relationships[key] && 'data' in relationships[key]) {
        const relatedRefs = relationships[key].data;
        if (relatedRefs === null) {
          instance.$values[key] = null;
        } else if (Array.isArray(relatedRefs)) {
          instance.$values[key] = await Promise.all(relatedRefs.map(
            (recordRef) => deserializeRelated(recordRef, included, options),
          ));
        } else {
          instance.$values[key] = await deserializeRelated(relatedRefs, included, options);
        }
      }
    }
  }));

  return instance as ModelInstance;
}
