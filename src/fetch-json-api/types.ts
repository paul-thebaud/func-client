import { ModelId } from '@/core/model/types';
import { Dictionary } from '@/core/utilities/types';

export type JsonApiRecordId = ModelId;

export type JsonApiRecordRef = {
  type: string;
  id?: JsonApiRecordId;
};

export type JsonApiRecord = JsonApiRecordRef & {
  attributes?: Dictionary;
  relationships?: Dictionary<{ data: JsonApiRecordRef[] | JsonApiRecordRef | null }>;
};

export type FetchJsonApiFactoryOptions = {
  baseURL?: string;
  fetch?: typeof fetch;
};
