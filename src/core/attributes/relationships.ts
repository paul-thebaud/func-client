import type Model from '@/core/model';
import type Relationship from '@/core/attributes/relationship';
import { Prev } from '@/core/types/utilities/prev';

export type DeepRelationshipsKey<T extends Model, D extends number = 5> =
  [D] extends [0]
    ? never
    : keyof T extends infer K
      ? K extends string & keyof T
        ? T[K] extends Relationship<infer R>
          ? K | `${K}.${DeepRelationshipsKey<R, Prev[D]>}` : never : never : never;
