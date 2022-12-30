import { ModelId } from '@/core';

export type JsonNormalizedRecordId = ModelId;

export type JsonNormalizedRecordRef = {
  id: JsonNormalizedRecordId;
  type: string;
};

export type JsonNormalizedAttribute = unknown;

export type JsonNormalizedRelation = JsonNormalizedRecordRef[] | JsonNormalizedRecordRef | null;

export type JsonNormalizedRecord = {
  id?: JsonNormalizedRecordId;
  type?: string;
  [K: string]: JsonNormalizedAttribute | JsonNormalizedRelation;
};

export type JsonNormalizedData = {
  data: JsonNormalizedRecord[];
  included: JsonNormalizedRecord[];
};

export type JsonRawData<D> = {
  data: D[];
  included: D[];
};
