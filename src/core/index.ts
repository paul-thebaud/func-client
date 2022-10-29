import type { ActionResult, ActionResultOrAny, Adapter } from '@/core/adapter/adapter';
import Relationship from '@/core/attributes/relationship';
import Builder from '@/core/builder';
import composable from '@/core/composable';
import type {
  Connection,
  ConnectionAction,
  ConnectionResult,
  ConnectionResultOrAny,
} from '@/core/connection/connection';
import type { Converter } from '@/core/converter/converter';
import attr from '@/core/decorators/attr';
import belongsTo from '@/core/decorators/belongsTo';
import hasMany from '@/core/decorators/hasMany';
import makeConnection from '@/core/makeConnection';
import Model from '@/core/model';
import type { Pagination } from '@/core/pagination/pagination';
import type { Registry } from '@/core/registry/registry';
import type { Store } from '@/core/store/store';
import BooleanTransformer from '@/core/transformers/booleanTransformer';
import DateTransformer from '@/core/transformers/dateTransformer';
import NumberTransformer from '@/core/transformers/numberTransformer';
import StringTransformer from '@/core/transformers/stringTransformer';
import type {
  BidirectionalTransformer,
  ClassicTransformer,
  Transformer,
  TransformersRegistry,
} from '@/core/transformers/transformer';
import withDefaultTransformers from '@/core/transformers/withDefaultTransformers';
import type {
  AttributeOptions,
  InitOptions,
  ModelClass,
  ModelsRegistry,
  RelationshipOptions,
} from '@/core/types/model';
import type { PaginatedQuery, Query } from '@/core/types/query';
import type { ReactivityFactory } from '@/core/types/reactivity';
import type {
  ExistingRecordData,
  ExistingRecordIdentifier,
  NewRecordData,
  NewRecordIdentifier,
  RecordData,
  RecordId,
  RecordType,
  RelationshipIdentifier,
  RelationshipValue,
} from '@/core/types/record';
import type { AttributeDef, RecordSchema, RelationshipDef } from '@/core/types/schema';
import type { Serializable } from '@/core/types/serializable/serializable';
import type { Awaitable } from '@/core/types/utilities/awaitable';
import type { Constructor } from '@/core/types/utilities/constructor';
import type { Dictionary } from '@/core/types/utilities/dictionary';
import type { Optional } from '@/core/types/utilities/optional';

export {
  Adapter,
  ActionResult,
  ActionResultOrAny,
  composable,
  Relationship,
  Connection,
  ConnectionAction,
  ConnectionResult,
  ConnectionResultOrAny,
  Converter,
  attr,
  belongsTo,
  hasMany,
  makeConnection,
  Builder,
  InitOptions,
  AttributeOptions,
  RelationshipOptions,
  Model,
  Pagination,
  Registry,
  Store,
  BooleanTransformer,
  DateTransformer,
  NumberTransformer,
  StringTransformer,
  BidirectionalTransformer,
  ClassicTransformer,
  Transformer,
  TransformersRegistry,
  withDefaultTransformers,
  ModelClass,
  ModelsRegistry,
  Query,
  PaginatedQuery,
  ReactivityFactory,
  RecordType,
  RecordId,
  NewRecordIdentifier,
  ExistingRecordIdentifier,
  RelationshipIdentifier,
  RelationshipValue,
  RecordData,
  NewRecordData,
  ExistingRecordData,
  AttributeDef,
  RelationshipDef,
  RecordSchema,
  Serializable,
  Awaitable,
  Constructor,
  Dictionary,
  Optional,
};
