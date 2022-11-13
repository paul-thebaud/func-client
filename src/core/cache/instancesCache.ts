import { InstancesCacheItem, InstancesCacheOptions } from '@/core/cache/types';
import { ModelId, ModelInstance } from '@/core/model/types';
import { InstancesCacheI } from '@/core/types';

export default class InstancesCache<R = unknown> implements InstancesCacheI {
  private instancesPerTypesMap: Map<string, Map<ModelId, InstancesCacheItem<R>>>;

  private options: InstancesCacheOptions<R>;

  public constructor(options: InstancesCacheOptions<R>) {
    this.instancesPerTypesMap = new Map();
    this.options = options;
  }

  public async find(type: string, id: ModelId) {
    const item = this.useInstancesMap(type).get(id);
    if (!item) {
      return null;
    }

    if (this.shouldExpire(item)) {
      await this.forget(type, id);

      return null;
    }

    const instance = await this.options.mode.deref(item.ref);
    if (!instance) {
      await this.forget(type, id);

      return null;
    }

    return instance;
  }

  public async put(type: string, id: ModelId, instance: ModelInstance) {
    this.useInstancesMap(type).set(id, {
      ref: await this.options.mode.ref(instance),
      time: new Date().getTime(),
    });
  }

  public async forget(type: string, id: ModelId) {
    this.useInstancesMap(type).delete(id);
  }

  public async forgetAll(type: string) {
    this.useInstancesMap(type).clear();
  }

  protected shouldExpire(item: InstancesCacheItem<R>) {
    return this.options.isExpired && this.options.isExpired(item);
  }

  private useInstancesMap(type: string) {
    let instancesMap = this.instancesPerTypesMap.get(type);
    if (!instancesMap) {
      instancesMap = new Map();

      this.instancesPerTypesMap.set(type, instancesMap);
    }

    return instancesMap;
  }
}
