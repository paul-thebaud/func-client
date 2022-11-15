import { ModelInstance } from '@/core/model/types';

export type InstancesRefMode<R> = {
  ref(instance: ModelInstance): R | Promise<R>;
  deref(ref: R): ModelInstance | undefined | Promise<ModelInstance | undefined>;
};

export type InstancesCacheOptions<R> = {
  mode: InstancesRefMode<R>;
};
