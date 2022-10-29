import type Model from '@/core/model';
import { Registry } from '@/core/registry/registry';
import { Transformer } from '@/core/transformers/transformer';
import { RecordType } from '@/core/types/record';
import { Constructor } from '@/core/types/utilities/constructor';

export type InitOptions = {
  noInit: boolean;
  noDefaults: boolean;
};

export type AttributeOptions = {
  cast: Transformer | string | undefined;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
  alias: string | undefined;
};

export type RelationshipOptions = {
  inverse: string | null;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
  alias: string | undefined;
};

export type MixableModel = abstract new(...args: any[]) => Model;

export type ModelClass = Constructor<Model> & typeof Model;

export type ModelsRegistry = Registry<RecordType, ModelClass>;
