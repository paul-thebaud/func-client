import { Constructor, Dictionary, Prev } from '@/core/utilities/types';

export type ModelId = string | number;

export type ModelProp<T> = {
  default: T | undefined;
};

export type ModelAttribute<T> = ModelProp<T> & {
  $MODEL_TYPE: 'attribute';
};

export type ModelRelation<T> = ModelProp<T> & {
  $MODEL_TYPE: 'relation';
};

export type ModelSchemaRaw = Dictionary;

export type ModelSchema<S extends ModelSchemaRaw> = [keyof S] extends [never]
  ? Dictionary<ModelAttribute<any> | ModelRelation<any>>
  : {
    [K in keyof S]: S[K] extends ModelAttribute<any>
      ? S[K] : S[K] extends ModelRelation<any>
        ? S[K] : never;
  };

export type ModelValues<S extends ModelSchemaRaw> = [keyof S] extends [never]
  ? Dictionary
  : {
    [K in keyof S]: S[K] extends ModelAttribute<infer T>
      ? T : S[K] extends ModelRelation<infer T>
        ? T : never;
  };

export type ModelInstance<S extends ModelSchemaRaw = {}> = {
  readonly $MODEL_TYPE: 'instance';
  readonly constructor: Model<S>;
  // FIXME Should the model id be nullable in its type?
  id: ModelId;
  $original: ModelValues<S>;
  $values: ModelValues<S>;
} & {
  [K in keyof S]: S[K] extends ModelAttribute<infer T>
    ? T : S[K] extends ModelRelation<infer T>
      ? T : S[K];
};

export type Model<S extends ModelSchemaRaw = {}> = {
  readonly $MODEL_TYPE: 'model';
  readonly $type: string;
  readonly $rawSchema: () => S;
  readonly $schema: ModelSchema<S>;
} & Constructor<ModelInstance<S>>;

export type ModelInferRawSchema<M> = M extends ModelInstance<infer S>
  ? ModelSchema<S>
  : M extends Model<infer S>
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
