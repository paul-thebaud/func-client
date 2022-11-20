import { Transform } from '@/core/transforms/types';
import { Constructor, Dictionary, Prev } from '@/core/utilities/types';

export type ModelConfig = {
  type: string;
  baseURL?: string;
  comparator?: (newValue: unknown, prevValue: unknown) => boolean;
  cloner?: <T = unknown>(value: T) => T;
};

export type ModelId = string | number;

export type DefaultFactory<T> = () => T;

export type ModelProp<T> = {
  default?: T | DefaultFactory<T> | undefined;
  alias?: string | undefined;
  readonly?: boolean;
};

export type ModelAttribute<T, S> = ModelProp<T> & {
  $MODEL_TYPE: 'attribute';
  transformer?: Transform<T | undefined, S> | undefined;
};

export type ModelRelationType = 'hasOne' | 'hasMany';

export type ModelRelation<T> = ModelProp<T> & {
  $MODEL_TYPE: 'relation';
  $RELATION_TYPE: ModelRelationType;
  type?: string;
};

// TODO Rename S generics to D.
export type ModelDefinition = Dictionary;

export type ModelSchema<S extends ModelDefinition> = [keyof S] extends [never]
  ? Dictionary<ModelAttribute<any, any> | ModelRelation<any>>
  : {
    [K in keyof S]: S[K] extends ModelAttribute<any, any>
      ? S[K] : S[K] extends ModelRelation<any>
        ? S[K] : never;
  };

export type ModelValues<S extends ModelDefinition> = [keyof S] extends [never]
  ? Dictionary
  : {
    [K in keyof S]: S[K] extends ModelAttribute<infer T, any>
      ? T : S[K] extends ModelRelation<infer T>
        ? T : never;
  };

export type ModelInstanceHook =
  | 'onCreating'
  | 'onCreated'
  | 'onUpdating'
  | 'onUpdated'
  | 'onSaving'
  | 'onSaved'
  | 'onDestroying'
  | 'onDestroyed';

export type ModelInstance<S extends ModelDefinition = {}> = {
  readonly $MODEL_TYPE: 'instance';
  readonly constructor: Model<S>;
  // FIXME Should the model id be nullable in its type?
  id: ModelId;
  exists: boolean;
  $original: Partial<ModelValues<S>>;
  $values: Partial<ModelValues<S>>;
} & {
  [K in keyof S]: S[K] extends ModelAttribute<infer T, any>
    ? T : S[K] extends ModelRelation<infer T>
      ? T : S[K];
};

export type ModelClass<S extends ModelDefinition = {}> = {
  readonly $MODEL_TYPE: 'model';
  readonly $config: ModelConfig;
  readonly $rawSchema: () => S;
  readonly $schema: ModelSchema<S>;
  extend<NS extends ModelSchema<{}>, NE extends object>(
    addSchemaAndExtension: { schema: NS; extension: NE; },
  ): Model<S & NS & NE, ModelInstance<S & NS & NE>>;
  schema<NS extends ModelSchema<{}>>(
    addSchema: NS,
  ): Model<S & NS, ModelInstance<S & NS>>;
  extension<NE extends object>(
    addExtension: NE & ThisType<ModelInstance<S & NE>>,
  ): Model<S & NE, ModelInstance<S & NE>>;
};

export type Model<S extends ModelDefinition = {}, I extends ModelInstance<S> = ModelInstance<S>> =
  & ModelClass<S>
  & Constructor<I>;

export type ModelInferRawSchema<M> = M extends ModelInstance<infer S>
  ? ModelSchema<S>
  : M extends ModelClass<infer S>
    ? ModelSchema<S>
    : never;

export type ModelDotRelation<S, D extends number = 5> =
  [D] extends [0]
    ? never
    : keyof S extends infer K
      ? K extends string & keyof S
        ? S[K] extends never
          ? never
          : S[K] extends ModelRelation<infer T>
            ? T extends any[]
              ? K | `${K}.${ModelDotRelation<ModelInferRawSchema<T[number]>, Prev[D]>}`
              : K | `${K}.${ModelDotRelation<ModelInferRawSchema<T>, Prev[D]>}`
            : never : never : never;
