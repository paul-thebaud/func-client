import { Dictionary, ModelId } from '@/core';

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
export type JsonApiRelationships = Dictionary<{
  data?: JsonApiResourceIdentifier[] | JsonApiResourceIdentifier | null;
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
}>;

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

export type NewJsonApiResource = JsonApiAbstractResource & {
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
  data?: JsonApiResource[] | JsonApiResource | NewJsonApiResource | null;
  included?: JsonApiResource[];
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
  errors?: JsonApiError[];
  jsonapi?: {
    version?: string;
    meta?: JsonApiMeta;
  };
};
