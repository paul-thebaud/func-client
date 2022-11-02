import { isModelInstance } from '@/core';
import type { WithStoreContext } from '@/core/action/changers/useStore';
import type { ActionContext } from '@/core/action/types';
import type { ModelInstance } from '@/core/model/types';
import type { Store } from '@/core/store/types';
import isNil from '@/core/utilities/isNil';
import { JsonApiIncludedMap } from '@/fetch-json-api/serialization/makeIncludedMap';
import { JsonApiRecord, JsonApiRecordId, JsonApiRecordRef } from '@/fetch-json-api/types';

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
  context: WithStoreContext<ActionContext, Store>,
  recordRef: JsonApiRecordRef,
  included: JsonApiIncludedMap,
) {
  const includedOfType = includedOfTypeMap(recordRef, included);
  const instanceOrRecord = includedOfType.get(recordRef.id as JsonApiRecordId);
  if (!instanceOrRecord) {
    // TODO
    throw new Error();
  }

  if (isModelInstance(instanceOrRecord)) {
    return instanceOrRecord;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return deserializeOne(context, instanceOrRecord, included);
}

export default async function deserializeOne(
  context: WithStoreContext<ActionContext, Store>,
  record: JsonApiRecord,
  included: JsonApiIncludedMap,
) {
  // TODO Retrieve existing from store.
  const ModelClass = await context.store.modelFor(record.type);
  const instance = new ModelClass();

  instance.id = isNil(record.id) ? instance.id : record.id;

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
            (recordRef) => deserializeRelated(context, recordRef, included),
          ));
        } else {
          instance.$values[key] = await deserializeRelated(context, relatedRefs, included);
        }
      }
    }
  }));

  return instance as ModelInstance;
}
