import type Model from '@/core/model';
import { Store } from '@/core/store/store';
import { ModelsRegistry } from '@/core/types/model';
import { RecordId, RecordType } from '@/core/types/record';

/**
 * Class MapStore.
 *
 * Store implementation using Map and WeakRef with garbage collection
 * capabilities.
 */
export default class WeakRefsMapStore implements Store {
  /**
   * Registry of models class to create models instance.
   *
   * @private
   */
  private readonly registry: ModelsRegistry;

  /**
   * Map of record type and another map containing record ID and WeakRef
   * to models.
   *
   * @private
   */
  private readonly instancesMaps: Map<RecordType, Map<RecordId, WeakRef<Model>>>;

  /**
   * MapStore constructor.
   */
  public constructor(registry: ModelsRegistry) {
    this.registry = registry;

    this.instancesMaps = new Map();
  }

  /**
   * @inheritDoc
   */
  public async makeOne<M extends Model>(type: RecordType) {
    const modelClass = await this.registry.get(type);

    return modelClass.make({}, { noDefaults: true }) as M;
  }

  /**
   * @inheritDoc
   */
  public async findOne<M extends Model>(type: RecordType, id: RecordId) {
    return this.useInstancesMap<M>(type).get(id)?.deref() || null;
  }

  /**
   * @inheritDoc
   */
  public async putOne<M extends Model>(type: RecordType, id: RecordId, model: M) {
    this.useInstancesMap(type).set(id, new WeakRef(model));
  }

  /**
   * @inheritDoc
   */
  public async findOrMakeOne<M extends Model>(type: RecordType, id: RecordId) {
    const existing = await this.findOne<M>(type, id);
    if (existing) {
      return existing;
    }

    const model = await this.makeOne<M>(type);

    await this.putOne(type, id, model);

    return model;
  }

  /**
   * @inheritDoc
   */
  public async forgetOne(type: RecordType, id: RecordId) {
    this.useInstancesMap(type).delete(id);
  }

  /**
   * Garbage collect references (record ID) to instances when those instances
   * have already been garbage collected.
   */
  public forgetEmptyRefs() {
    this.instancesMaps.forEach((instancesMap) => {
      instancesMap.forEach((modelRef, id) => {
        if (!modelRef.deref()) {
          instancesMap.delete(id);
        }
      });
    });
  }

  /**
   * Get the instances map for a record type.
   * Create the map if it does not exist already.
   *
   * @param type
   *
   * @private
   */
  private useInstancesMap<M extends Model>(type: RecordType): Map<RecordId, WeakRef<M>> {
    if (!this.instancesMaps.has(type)) {
      this.instancesMaps.set(type, new Map());
    }

    return this.instancesMaps.get(type) as Map<RecordId, WeakRef<M>>;
  }
}
