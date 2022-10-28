import type Model from '@/core/model';
import { Pagination } from '@/core/pagination/pagination';
import Relationship from '@/core/attributes/relationship';
import { PaginatedQuery, Query } from '@/core/types/query';
import { RecordId, RecordType, RelationshipValue } from '@/core/types/record';
import { Serializable } from '@/core/types/serializable/serializable';

export type ConnectionAction = {
  method: 'get' | 'post' | 'patch' | 'put' | 'delete' | 'options';
  path?: string;
  payload?: Serializable;
  sendsRecord?: boolean;
  returnsRecords?: boolean;
};

export type ConnectionResult<D> = {
  data: D;
  meta?: any;
  raw: any;
};

export type ConnectionResultOrAny<A extends ConnectionAction, D> = {
  data: A extends { returnsRecords: false } ? any : D;
  meta?: any;
  raw: any;
};

export interface Connection {
  actionAll<M extends Model, A extends ConnectionAction, P extends Pagination>(
    model: M,
    action: A,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResultOrAny<A, M[]>>;

  action<M extends Model, A extends ConnectionAction, P extends Pagination>(
    model: M,
    action: A,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResultOrAny<A, M>>;

  findAll<M extends Model, P extends Pagination>(
    model: M,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResult<M[]>>;

  findInStore<M extends Model>(
    type: RecordType,
    id: RecordId,
  ): Promise<M | null>;

  find<M extends Model>(
    type: RecordType,
    id: RecordId,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M | null>>;

  create<M extends Model>(
    model: M,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M>>;

  update<M extends Model>(
    model: M,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M>>;

  delete<M extends Model>(
    model: M,
    query: Partial<Query>,
  ): Promise<ConnectionResult<M>>;

  findRelated<M extends Model, V extends RelationshipValue<M>, P extends Pagination>(
    relationship: Relationship<M, Model, V>,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ConnectionResult<V>>;

  updateRelationship<M extends Model, V extends RelationshipValue<M>>(
    relationship: Relationship<M, Model, V>,
  ): Promise<ConnectionResult<null>>;
}
