import { RefsCacheMode, RefsCacheOptions } from '@/core/cache/types';
import { ModelId, ModelInstance } from '@/core/model/types';
import { CacheI } from '@/core/types';

export default class RefsCache implements CacheI {
  private readonly instances: Map<string, Map<ModelId, unknown>>;

  private mode!: RefsCacheMode<unknown>;

  public constructor(options: RefsCacheOptions) {
    this.instances = new Map();
    this.withMode(options.mode);
  }

  public withMode<T>(mode: RefsCacheMode<T>) {
    this.mode = mode;

    return this;
  }

  public async find(type: string, id: ModelId) {
    const ref = this.useInstancesMap(type).get(id);
    if (!ref) {
      return null;
    }

    const instance = await this.mode.deref(ref);
    if (!instance) {
      await this.forget(type, id);

      return null;
    }

    return instance;
  }

  public async put(type: string, id: ModelId, instance: ModelInstance) {
    this.useInstancesMap(type).set(id, await this.mode.ref(instance));
  }

  public async forget(type: string, id: ModelId) {
    this.useInstancesMap(type).delete(id);
  }

  public async forgetAll(type: string) {
    this.useInstancesMap(type).clear();
  }

  private useInstancesMap(type: string) {
    let instancesMap = this.instances.get(type);
    if (!instancesMap) {
      instancesMap = new Map();

      this.instances.set(type, instancesMap);
    }

    return instancesMap;
  }
}
