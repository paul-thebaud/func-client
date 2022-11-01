import { Model } from '@/core/model/types';

export type Store = {
  modelFor(type: string): Promise<Model>;
};
