import { ModelInstance } from '@/core/model/types';

export type InstancesCacheExpired<R> = (item: InstancesCacheItem<R>) => boolean;

export type InstancesCacheMode<R> = {
  ref(instance: ModelInstance): R | Promise<R>;
  deref(ref: R): ModelInstance | undefined | Promise<ModelInstance | undefined>;
};

export type InstancesCacheItem<R> = {
  ref: R;
  time: number;
};

export type InstancesCacheOptions<R> = {
  mode: InstancesCacheMode<R>;
  isExpired?: InstancesCacheExpired<R>;
};
