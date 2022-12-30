import { ModelInstance } from '@/core/model/types';
import { Awaitable } from '@/core/utilities/types';

export type RefsCacheMode<R> = {
  ref(instance: ModelInstance): Awaitable<R>;
  deref(ref: R): Awaitable<ModelInstance | undefined>;
};

export type RefsCacheOptions = {
  mode: RefsCacheMode<unknown>;
};
