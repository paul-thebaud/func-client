import { Registry } from '@/core/registry/registry';
import { Serializable } from '@/core/types/serializable/serializable';
import { Awaitable } from '@/core/types/utilities/awaitable';

export type ClassicTransformer = {
  transformFromRaw(value: Serializable, params: unknown[]): Awaitable<unknown>;

  transformToRaw(value: unknown, params: unknown[]): Awaitable<Serializable>;
};

export type BidirectionalTransformer = {
  transform(value: Serializable, params: unknown[]): Awaitable<Serializable>;
};

export type Transformer = ClassicTransformer | BidirectionalTransformer;

export type TransformersRegistry = Registry<string, Transformer>;
