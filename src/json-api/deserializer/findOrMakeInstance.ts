import { ActionContext, CacheI, FuncClientError, Model, ModelInstance, RegistryI } from '@/core';
import isInstance from '@/core/model/guards/isInstance';
import isNil from '@/core/utilities/isNil';
import { NewJsonApiResource } from '@/json-api/types';

export default async function findOrMakeInstance(
  context: ActionContext & { cache?: CacheI; registry?: RegistryI; model?: Model; },
  resource: NewJsonApiResource,
) {
  let instance: ModelInstance | undefined;

  if (!isNil(resource.id)) {
    if (isInstance(context.instance) && context.instance.id === resource.id) {
      instance = context.instance;
    } else if (context.cache && !isNil(resource.id)) {
      const cachedInstance = await context.cache.find(resource.type, resource.id);
      if (cachedInstance) {
        instance = cachedInstance;
      }
    }
  }

  if (!instance) {
    if (context.registry) {
      const ModelClass = await context.registry.modelFor(resource.type);

      instance = new ModelClass();
    } else if (context.model && context.model.$config.type === resource.type) {
      const ModelClass = context.model;

      instance = new ModelClass();
    } else {
      throw new FuncClientError(
        `No alternative found for JSON:API resource with type \`${resource.type}\`. You should use a Registry and register a model for this type in it.`,
      );
    }

    instance!.id = resource.id ?? instance!.id;
  }

  if (!isNil(instance!.id)) {
    if (context.cache) {
      await context.cache.put(resource.type, instance!.id, instance!);
    }
  }

  return instance!;
}
