import FuncModelError from '@/core/errors/funcModelError';
import { Model } from '@/core/model/types';
import { Dictionary } from '@/core/utilities/types';

export default function makeStore() {
  const modelRegistry: Map<string, () => Promise<Model>> = new Map();

  return {
    modelFor<M extends Model>(type: string) {
      const modelResolver = modelRegistry.get(type);
      if (!modelResolver) {
        const registeredModels = [...modelRegistry.keys()].map((t) => `- ${t}`).join('\n');

        throw new FuncModelError(`Model for type \`${type}\` is not registered. Did you forget registering it?\nRegistered models:\n${registeredModels}`);
      }

      return modelResolver() as Promise<M>;
    },
    register(models: Model[] | Dictionary<() => Promise<Model>>) {
      if (Array.isArray(models)) {
        models.forEach((model) => {
          modelRegistry.set(model.$type, async () => model);
        });
      } else {
        Object.entries(models).forEach(([type, modelResolver]) => {
          modelRegistry.set(type, modelResolver);
        });
      }
    },
  };
}
