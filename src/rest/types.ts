import { ModelId } from '@/core';
import { Dictionary } from '@/core/utilities/types';

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
