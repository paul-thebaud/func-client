import { ModelInstance } from '@/core/model/types';
import { Awaitable } from '@/utilities';

export type RefsCacheMode<R> = {
  ref(instance: ModelInstance): Awaitable<R>;
  deref(ref: R): Awaitable<ModelInstance | undefined>;
};

export type RefsCacheConfig<R = unknown> = {
  mode?: RefsCacheMode<R>;
};
