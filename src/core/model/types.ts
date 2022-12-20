import { Hookable, HookCallback } from '@/core/hooks/types';
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

export type ModelSchema<D extends {} = {}> = {
  [K in keyof D]: D[K] extends ModelAttribute<any, any>
    ? D[K] : D[K] extends ModelRelation<any>
      ? D[K] : never;
};

export type ModelHookCallback = HookCallback<ModelInstance>;

export type ModelHooksDefinition = {
  retrieved: ModelHookCallback;
  creating: ModelHookCallback;
  created: ModelHookCallback;
  updating: ModelHookCallback;
  updated: ModelHookCallback;
  saving: ModelHookCallback;
  saved: ModelHookCallback;
  destroying: ModelHookCallback;
  destroyed: ModelHookCallback;
};

export type ModelClass<D extends {} = any> = Hookable<ModelHooksDefinition> & {
  readonly $MODEL_TYPE: 'model';
  readonly $config: ModelConfig;
  readonly $schema: ModelSchema<D>;
  extends<ND extends {} = {}>(
    extendsFrom?: ND & ThisType<ModelInstance<D & ND>>,
  ): Model<D & ND, ModelInstance<D & ND>>;
};

export type Model<D extends {} = any, I extends ModelInstance<D> = any> =
  & ModelClass<D>
  & Constructor<I>;

export type ModelClassInstance<D extends {} = any> = {
  readonly $model: ModelClass<D>;
};

export type ModelInstance<D extends {} = any> = {
  readonly $MODEL_TYPE: 'instance';
  readonly $model: ModelClass<D>;
  // FIXME Should the model id be nullable in its type?
  id: ModelId;
  exists: boolean;
  $loaded: Dictionary<true>;
  $original: Partial<ModelValues<ModelClass<D>>>;
  $values: Partial<ModelValues<ModelClass<D>>>;
} & {
  [K in keyof D]: D[K] extends ModelAttribute<infer T, any>
    ? T : D[K] extends ModelRelation<infer T>
      ? T : D[K];
};

export type ModelInferDefinition<M> = M extends ModelClass<infer D>
  ? D
  : M extends ModelClassInstance<infer D>
    ? D
    : {};

export type ModelInferSchema<M> = ModelSchema<ModelInferDefinition<M>>;

export type ModelValues<M> = {
  [K in keyof ModelInferDefinition<M>]:
  ModelInferDefinition<M>[K] extends ModelAttribute<infer T, any>
    ? T : ModelInferDefinition<M>[K] extends ModelRelation<infer T>
      ? T : never;
};

export type ModelKey<M> = {
  [K in keyof ModelInferDefinition<M>]:
  ModelInferDefinition<M>[K] extends ModelAttribute<any, any>
    ? K : ModelInferDefinition<M>[K] extends ModelRelation<any>
      ? K : never;
}[keyof ModelInferDefinition<M>];

export type ModelRelationKey<M> =
  keyof ModelInferSchema<M> extends infer K
    ? K extends string & keyof ModelInferSchema<M>
      ? ModelInferSchema<M>[K] extends never
        ? never
        : ModelInferSchema<M>[K] extends ModelRelation<unknown>
          ? K
          : never : never : never;

export type ModelRelationDotKey<M, Depth extends number = 5> =
  [Depth] extends [0]
    ? never
    : keyof ModelInferSchema<M> extends infer K
      ? K extends string & keyof ModelInferSchema<M>
        ? ModelInferSchema<M>[K] extends never
          ? never
          : ModelInferSchema<M>[K] extends ModelRelation<infer T>
            ? T extends any[]
              ? K | `${K}.${ModelRelationDotKey<T[number], Prev[Depth]>}`
              : K | `${K}.${ModelRelationDotKey<T, Prev[Depth]>}`
            : never : never : never;
