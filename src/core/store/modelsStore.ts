import FuncModelError from '@/core/errors/funcModelError';
import isModel from '@/core/model/guards/isModel';
import { Model } from '@/core/model/types';
import { ModelsStoreI } from '@/core/types';
import wrap from '@/core/utilities/wrap';
import { Arrayable, Dictionary } from '@/core/utilities/types';

export default class ModelsStore implements ModelsStoreI {
  private modelsMap: Map<string, () => Promise<Model>>;

  public constructor() {
    this.modelsMap = new Map();
  }

  public modelFor(type: string) {
    const modelResolver = this.modelsMap.get(type);
    if (!modelResolver) {
      const registeredModels = [...this.modelsMap.keys()].map((t) => `- ${t}`).join('\n');

      throw new FuncModelError(
        `Model for type \`${type}\` is not registered. Did you forget registering it?\nRegistered models:\n${registeredModels}`,
      );
    }

    return modelResolver();
  }

  public register(models: Arrayable<Model> | Dictionary<() => Promise<Model>>) {
    if (isModel(models) || Array.isArray(models)) {
      return this.registerSync(models);
    }

    return this.registerAsync(models);
  }

  public registerSync(models: Arrayable<Model>) {
    wrap(models).forEach((model) => {
      this.modelsMap.set(model.$config.type, async () => model);
    });

    return this;
  }

  public registerAsync(models: Dictionary<() => Promise<Model>>) {
    Object.entries(models).forEach(([type, modelResolver]) => {
      this.modelsMap.set(type, modelResolver);
    });

    return this;
  }
}
