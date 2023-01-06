import { ModelId } from '@/core';
import { Dictionary } from '@/utilities';

export type RestResourceId = ModelId;

export type RestAbstractResource = Dictionary & {
  type?: string;
};

export type RestResource = RestAbstractResource & {
  id: RestResourceId;
};

export type RestNewResource = RestAbstractResource & {
  id?: RestResourceId;
};

export type RestDocument = {
  data?: RestResource[] | RestResource | RestNewResource | null;
};
