import FuncClientError from '@/core/errors/funcClientError';
import isModel from '@/core/model/guards/isModel';
import { Model } from '@/core/model/types';
import { RegistryI } from '@/core/types';
import { Arrayable, Dictionary } from '@/core/utilities/types';
import wrap from '@/core/utilities/wrap';

export default class MapRegistry implements RegistryI {
  private models: Map<string, () => Promise<Model>>;

  public constructor() {
    this.models = new Map();
  }

  public modelFor(type: string) {
    const modelResolver = this.models.get(type);
    if (!modelResolver) {
      const registeredModels = [...this.models.keys()].map((t) => `- ${t}`).join('\n');

      throw new FuncClientError(
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
      this.models.set(model.$config.type, async () => model);
    });

    return this;
  }

  public registerAsync(models: Dictionary<() => Promise<Model>>) {
    Object.entries(models).forEach(([type, modelResolver]) => {
      this.models.set(type, modelResolver);
    });

    return this;
  }
}
