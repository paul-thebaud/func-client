import { ModelId } from '@/core';
import { Dictionary } from '@/utilities';

export type JsonApiLink = {
  href: string;
  meta?: JsonApiMeta;
} | string;

export type JsonApiLinks = Dictionary<JsonApiLink>;

export type JsonApiMeta = Dictionary<any>;

export type JsonApiResourceId = ModelId;

export type JsonApiResourceIdentifier = {
  type: string;
  id: JsonApiResourceId;
};

export type JsonApiAttributes = Dictionary;
export type JsonApiRelationship = {
  data?: JsonApiResourceIdentifier[] | JsonApiResourceIdentifier | null;
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
};
export type JsonApiRelationships = Dictionary<JsonApiRelationship>;

export type JsonApiAbstractResource = {
  type: string;
  attributes?: JsonApiAttributes;
  relationships?: JsonApiRelationships;
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
};

export type JsonApiResource = JsonApiAbstractResource & {
  id: JsonApiResourceId;
};

export type JsonApiNewResource = JsonApiAbstractResource & {
  id?: JsonApiResourceId;
};

export type JsonApiError = {
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    header?: string;
  };
  meta?: JsonApiMeta;
};

export type JsonApiDocument = {
  data?: JsonApiResource[] | JsonApiResource | JsonApiNewResource | null;
  included?: JsonApiResource[];
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
  errors?: JsonApiError[];
  jsonapi?: {
    version?: string;
    meta?: JsonApiMeta;
  };
};