import { InstancesCacheOptions } from '@/core/cache/types';
import { ModelId, ModelInstance } from '@/core/model/types';
import { InstancesCacheI } from '@/core/types';

export default class InstancesCache<R = unknown> implements InstancesCacheI {
  private readonly instancesPerTypesMap: Map<string, Map<ModelId, R>>;

  private readonly options: InstancesCacheOptions<R>;

  public constructor(options: InstancesCacheOptions<R>) {
    this.instancesPerTypesMap = new Map();
    this.options = options;
  }

  public async find(type: string, id: ModelId) {
    const ref = this.useInstancesMap(type).get(id);
    if (!ref) {
      return null;
    }

    const instance = await this.options.mode.deref(ref);
    if (!instance) {
      await this.forget(type, id);

      return null;
    }

    return instance;
  }

  public async put(type: string, id: ModelId, instance: ModelInstance) {
    this.useInstancesMap(type).set(id, await this.options.mode.ref(instance));
  }

  public async forget(type: string, id: ModelId) {
    this.useInstancesMap(type).delete(id);
  }

  public async forgetAll(type: string) {
    this.useInstancesMap(type).clear();
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
