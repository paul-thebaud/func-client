import { ActionContext, FuncModelError, Model, ModelInstance, Store } from '@/core';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import { NewJsonApiResource } from '@/json-api/types';

export default async function makeOrFindInstance(
  context: ActionContext & { store?: Store; model?: Model; },
  record: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
) {
  // TODO First possibility is to find from cache or invalidate cache.

  let instance: ModelInstance;
  if (context.store) {
    const ModelClass = await context.store.modelFor(record.type);

    instance = new ModelClass();
  } else if (context.model && context.model.$type === record.type) {
    const ModelClass = context.model;

    instance = new ModelClass();
  } else {
    throw new FuncModelError(
      `No alternative found for JSON:API resource with type \`${record.type}\`. You should use a Store and register a model for this type in it.`,
    );
  }

  instance.id = record.id ?? instance.id;

  if (instance.id) {
    const includedMapOfType = includedMap.get(record.type);
    if (includedMapOfType) {
      includedMapOfType.set(instance.id, instance);
    }
  }

  return instance;
}
