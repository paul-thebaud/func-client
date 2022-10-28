import { ConnectionAction } from '@/core/connection/connection';
import { Pagination } from '@/core/pagination/pagination';
import { PaginatedQuery, Query } from '@/core/types/query';
import {
  ExistingRecordData,
  ExistingRecordIdentifier,
  NewRecordData, RecordId,
  RecordType,
  RelationshipIdentifier,
  RelationshipValue,
} from '@/core/types/record';

export type ActionResult<D> = {
  data: D;
  related?: ExistingRecordData[];
  meta?: any;
  [k: string]: any;
};

export type ActionResultOrAny<A extends ConnectionAction, D> = {
  data: A extends { returnsRecords: false } ? any : D;
  related?: ExistingRecordData[];
  meta?: any;
  [k: string]: any;
};

// TODO Support actions all/one.
export interface Adapter {
  actionAll<A extends ConnectionAction, P extends Pagination>(
    type: RecordType,
    action: A,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ActionResultOrAny<A, ExistingRecordData[]>>;

  actionRecord<A extends ConnectionAction, P extends Pagination>(
    record: ExistingRecordData,
    action: A,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ActionResultOrAny<A, ExistingRecordData | null>>;

  findAll<P extends Pagination>(
    type: RecordType,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ActionResult<ExistingRecordData[]>>;

  findRecord(
    type: RecordType,
    id: RecordId,
    query: Partial<Query>,
  ): Promise<ActionResult<ExistingRecordData>>;

  createRecord(
    record: NewRecordData,
    query: Partial<Query>,
  ): Promise<ActionResult<ExistingRecordData | null>>;

  updateRecord(
    record: ExistingRecordData,
    query: Partial<Query>,
  ): Promise<ActionResult<ExistingRecordData | null>>;

  deleteRecord(
    record: ExistingRecordData,
    query: Partial<Query>,
  ): Promise<ActionResult<ExistingRecordData | null>>;

  findRelated<P extends Pagination>(
    relationship: RelationshipIdentifier,
    query: Partial<PaginatedQuery<P>>,
  ): Promise<ActionResult<RelationshipValue<ExistingRecordData>>>;

  updateRelationship(
    relationship: RelationshipIdentifier,
    data: RelationshipValue<ExistingRecordIdentifier>,
  ): Promise<ActionResult<RelationshipValue<ExistingRecordIdentifier> | null>>;
}
