import { ModelId } from '@/core';
import { Dictionary } from '@/utilities';

export type JsonRestResourceId = ModelId;

export type JsonRestAbstractResource = Dictionary & {
  type?: string;
};

export type JsonRestResource = JsonRestAbstractResource & {
  id: JsonRestResourceId;
};

export type JsonRestNewResource = JsonRestAbstractResource & {
  id?: JsonRestResourceId;
};

export type JsonRestDocument = {
  data?: JsonRestResource[] | JsonRestResource | JsonRestNewResource | null;
};
