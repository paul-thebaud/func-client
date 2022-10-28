import type Model from '@/core/model';
import type Relationship from '@/core/relationships/relationship';
import { Transformer } from '@/core/transformers/transformer';
import { Dictionary } from '@/core/types/utilities/dictionary';

export type AttributeDef = {
  transformer: Transformer | string | undefined;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
};

export type RelationshipDef = {
  newReference: (model: Model) => Relationship;
  inverse: string | undefined | null;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
};

export type RecordSchema = {
  attributes: Dictionary<AttributeDef>;
  relationships: Dictionary<RelationshipDef>;
};
