import { ActionContext, FuncModelError, InstancesCacheI, Model, ModelInstance, ModelsStoreI } from '@/core';
import isNil from '@/core/utilities/isNil';
import { JsonApiIncludedMap } from '@/json-api/deserializer/makeIncludedMap';
import { NewJsonApiResource } from '@/json-api/types';

export default async function findOrMakeInstance(
  context: ActionContext & { cache?: InstancesCacheI; store?: ModelsStoreI; model?: Model; },
  resource: NewJsonApiResource,
  includedMap: JsonApiIncludedMap,
) {
  let instance: ModelInstance | undefined;

  if (context.cache && !isNil(resource.id)) {
    const cachedInstance = await context.cache.find(resource.type, resource.id);
    if (cachedInstance) {
      instance = cachedInstance;
    }
  }

  if (!instance) {
    if (context.store) {
      const ModelClass = await context.store.modelFor(resource.type);

      instance = new ModelClass();
    } else if (context.model && context.model.$type === resource.type) {
      const ModelClass = context.model;

      instance = new ModelClass();
    } else {
      throw new FuncModelError(
        `No alternative found for JSON:API resource with type \`${resource.type}\`. You should use a Store and register a model for this type in it.`,
      );
    }

    instance.id = resource.id ?? instance.id;
  }

  if (!isNil(instance.id)) {
    if (context.cache) {
      await context.cache.put(resource.type, instance.id, instance);
    }

    const includedMapOfType = includedMap.get(resource.type);
    if (includedMapOfType) {
      includedMapOfType.set(instance.id, instance);
    }
  }

  return instance;
}
