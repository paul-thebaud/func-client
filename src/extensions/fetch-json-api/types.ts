import { Dictionary } from '@/core/utilities/types';

export type JsonApiRecordId = string | number;

export type JsonApiRecordRef = {
  type: string;
  id: JsonApiRecordId;
};

export type JsonApiRecord = JsonApiRecordRef & {
  attributes?: Dictionary;
  relationships?: Dictionary<{ data: JsonApiRecordRef[] | JsonApiRecordRef | null }>;
};

export type FetchJsonApiFactoryOptions = {
  baseURL?: string;
  fetch?: typeof fetch;
};
