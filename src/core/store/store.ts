import type Model from '@/core/model';
import { RecordId, RecordType } from '@/core/types/record';

/**
 * Interface Store.
 *
 * Store olds existing models instances by record type and ID to
 * ensure a same record has always only one model instance at a given time.
 */
export interface Store {
  /**
   * Make a new model instance.
   *
   * @param type
   */
  makeOne<M extends Model>(type: RecordType): Promise<M>;

  /**
   * Find an existing model instance in store for record.
   *
   * @param type
   * @param id
   */
  findOne<M extends Model>(type: RecordType, id: RecordId): Promise<M | null>;

  /**
   * Put a model instance in store.
   *
   * @param type
   * @param id
   * @param model
   */
  putOne<M extends Model>(type: RecordType, id: RecordId, model: M): Promise<void>;

  /**
   * Find an existing model instance in store for record or put and return
   * a new model if not found.
   *
   * @param type
   * @param id
   */
  findOrMakeOne<M extends Model>(type: RecordType, id: RecordId): Promise<M>;

  /**
   * Remove the given record's corresponding model from store.
   *
   * @param type
   * @param id
   */
  forgetOne(type: RecordType, id: RecordId): Promise<void>;
}
