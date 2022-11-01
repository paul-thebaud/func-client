import { Model } from '@/core/model/types';

export default function makeStore() {
  const modelRegistry: Map<string, () => Promise<Model>> = new Map();

  return {
    modelFor<M extends Model>(type: string) {
      const modelResolver = modelRegistry.get(type);
      if (!modelResolver) {
        const registeredModels = [...modelRegistry.keys()].map((t) => `- ${t}`).join('\n');

        throw new Error(`[model.] Model for type \`${type}\` is not registered. Did you forget registering it?\nRegistered models:\n${registeredModels}`);
      }

      return modelResolver() as Promise<M>;
    },
    registerModel(model: Model) {
      modelRegistry.set(model.$type, async () => model);
    },
  };
}
