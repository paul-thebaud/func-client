import type Model from '@/core/model';
import Relationship from '@/core/relationships/relationship';

export default class BelongsTo<R extends Model, M extends Model = Model>
  extends Relationship<R, M, R | null> {
}
