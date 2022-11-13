import { Transform } from '@/core/transforms/types';
import { Constructor, Dictionary, Prev } from '@/core/utilities/types';

export type ModelId = string | number;

export type DefaultFactory<T> = () => T;

export type ModelProp<T, S> = {
  default?: T | DefaultFactory<T> | undefined;
  transformer?: Transform<T | undefined, S> | undefined;
  alias?: string | undefined;
};

export type ModelAttribute<T, S> = ModelProp<T, S> & {
  $MODEL_TYPE: 'attribute';
};

export type ModelRelation<T, S> = ModelProp<T, S> & {
  $MODEL_TYPE: 'relation';
};

export type ModelSchemaRaw = Dictionary;

export type ModelSchema<S extends ModelSchemaRaw> = [keyof S] extends [never]
  ? Dictionary<ModelAttribute<any, any> | ModelRelation<any, any>>
  : {
    [K in keyof S]: S[K] extends ModelAttribute<any, any>
      ? S[K] : S[K] extends ModelRelation<any, any>
        ? S[K] : never;
  };

export type ModelValues<S extends ModelSchemaRaw> = [keyof S] extends [never]
  ? Dictionary
  : {
    [K in keyof S]: S[K] extends ModelAttribute<infer T, any>
      ? T : S[K] extends ModelRelation<infer T, any>
        ? T : never;
  };

// TODO This will replace config.
export type ModelValueCloneHook<T> = (value: T) => T;
export type ModelValueCompareHook = (newValue: unknown, prevValue: unknown) => boolean;

export type ModelInstance<S extends ModelSchemaRaw = {}> = {
  readonly $MODEL_TYPE: 'instance';
  readonly constructor: Model<S>;
  // FIXME Should the model id be nullable in its type?
  id: ModelId;
  $original: Partial<ModelValues<S>>;
  $values: Partial<ModelValues<S>>;
} & {
  [K in keyof S]: S[K] extends ModelAttribute<infer T, any>
    ? T : S[K] extends ModelRelation<infer T, any>
      ? T : S[K];
};

export type ModelClass<S extends ModelSchemaRaw = {}> = {
  readonly $MODEL_TYPE: 'model';
  readonly $type: string;
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

export type Model<S extends ModelSchemaRaw = {}, I extends ModelInstance<S> = ModelInstance<S>> =
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
          : S[K] extends ModelRelation<infer T, any>
            ? T extends any[]
              ? K | `${K}.${ModelDotRelation<ModelInferRawSchema<T[number]>, Prev[D]>}`
              : K | `${K}.${ModelDotRelation<ModelInferRawSchema<T>, Prev[D]>}`
            : never : never : never;
