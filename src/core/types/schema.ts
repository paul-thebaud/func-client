import type Model from '@/core/model';
import { Transformer } from '@/core/transformers/transformer';
import { Dictionary } from '@/core/types/utilities/dictionary';

export type AttributeDef = {
  transformer: Transformer | string | undefined;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
  alias: string | undefined;
  makePropertyDescriptor: (model: Model) => PropertyDescriptor;
};

export type RelationshipDef = {
  inverse: string | undefined | null;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
  alias: string | undefined;
  makePropertyDescriptor: (model: Model) => PropertyDescriptor;
};

export type RecordSchema = {
  attributes: Dictionary<AttributeDef>;
  relationships: Dictionary<RelationshipDef>;
};
