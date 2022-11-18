import { ModelInstance } from '@/core/model/types';
import { Awaitable } from '@/core/utilities/types';

export type InstancesRefMode<R> = {
  ref(instance: ModelInstance): Awaitable<R>;
  deref(ref: R): Awaitable<ModelInstance | undefined>;
};

export type InstancesCacheOptions<R> = {
  mode: InstancesRefMode<R>;
};
