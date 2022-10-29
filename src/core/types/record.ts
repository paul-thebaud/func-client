import { Serializable } from '@/core/types/serializable/serializable';
import { Dictionary } from '@/core/types/utilities/dictionary';

export type RecordType = string;

export type RecordId = string | number;

export type NewRecordIdentifier = {
  type: RecordType;
  id: RecordId | null;
};

export type ExistingRecordIdentifier = {
  type: RecordType;
  id: RecordId;
};

export type RelationshipIdentifier = ExistingRecordIdentifier & {
  parentKey: string;
  // TODO polymorphic with many record type?
  relatedType?: RecordType;
  relatedKey?: string;
};

export type RelationshipValue<V> = V[] | V | null;

export type RecordData = {
  attributes?: Dictionary<Serializable>;
  relationships?: Dictionary<RelationshipValue<ExistingRecordIdentifier>>;
};

export type NewRecordData = NewRecordIdentifier & RecordData;

export type ExistingRecordData = ExistingRecordIdentifier & RecordData;
