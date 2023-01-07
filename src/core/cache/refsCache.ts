import { RefsCacheMode, RefsCacheConfig } from '@/core/cache/types';
import { ModelId, ModelInstance } from '@/core/model/types';
import { CacheI } from '@/core/types';
import { IdentifiersMap } from '@/utilities';

export default class RefsCache implements CacheI {
  private readonly instances: IdentifiersMap<unknown>;

  private mode!: RefsCacheMode<unknown>;

  public constructor(config: RefsCacheConfig) {
    this.instances = new IdentifiersMap();
    this.configure(config);
  }

  public configure(config: RefsCacheConfig) {
    Object.assign(this, config);

    return this;
  }

  public async find(type: string, id: ModelId) {
    const ref = this.instances.get(type, id);
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
    this.instances.set(type, id, await this.mode.ref(instance));
  }

  public async forget(type: string, id: ModelId) {
    this.instances.delete(type, id);
  }

  public async forgetAll(type: string) {
    this.instances.clear(type);
  }
}
