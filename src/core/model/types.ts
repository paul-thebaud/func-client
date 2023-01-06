import { Hookable, HookCallback } from '@/core/hooks/types';
import { Transform } from '@/core/transforms/types';
import { Awaitable, Constructor, Dictionary, Prev } from '@/utilities';

/**
 * Configuration of a model class.
 */
export type ModelConfig = {
  /**
   * Type which uniquely identify this model.
   * May be used by action's dependencies for different purpose
   * (endpoint computing, caching, etc.).
   */
  type: string;
  /**
   * Dedicated base URL. Will overwrite the default base URL.
   */
  baseURL?: string;
  /**
   * Compare two values when checking model instance changed values.
   *
   * @param newValue
   * @param prevValue
   *
   * @see {@link changed}
   */
  comparator?: (newValue: unknown, prevValue: unknown) => boolean;
  /**
   * Clone two values when sync model instances values state.
   *
   * @param value
   *
   * @see {@link reset}
   * @see {@link syncOriginal}
   */
  cloner?: <T = unknown>(value: T) => T;
};

/**
 * Unique identifier for a model instance.
 */
export type ModelId = string | number;

/**
 * Configuration for a model's property (attribute or relation).
 */
export type ModelProp<T = unknown> = {
  /**
   * Default value for the property.
   */
  default?: T | (() => T) | undefined;
  /**
   * Alias of the property (might be used when (de)serializing).
   */
  alias?: string | ((instance: ModelInstance, key: string) => Awaitable<string>) | undefined;
  /**
   * Avoid serializing the property (won't be sent to data source).
   *
   * TODO Rename this prop to something else ("localOnly"?). Keep readonly to avoid affectation.
   */
  readonly?: boolean;
  // TODO Doc.
  readOnly?: boolean;
};

/**
 * Configuration for a model's attribute.
 */
export type ModelAttribute<T = unknown, S = unknown> = ModelProp<T> & {
  /**
   * Internal type identifier for FuncModel's type guards.
   */
  $MODEL_TYPE: 'attribute';
  transformer?: Transform<T | undefined, S> | undefined;
};

/**
 * Available model relation types.
 */
export type ModelRelationType = 'hasOne' | 'hasMany' | 'morphOne' | 'morphMany';

/**
 * Configuration for a model's relation.
 */
export type ModelRelation<T = unknown> = ModelProp<T> & {
  /**
   * Internal type identifier for FuncModel's type guards.
   */
  $MODEL_TYPE: 'relation';
  $RELATION_TYPE: ModelRelationType;
  type?: string;
};

/**
 * Extract model's attributes and relations from the whole definition.
 */
export type ModelSchema<D extends {} = {}> = {
  [K in keyof D]: D[K] extends ModelAttribute<any, any>
    ? D[K] : D[K] extends ModelRelation<any>
      ? D[K] : never;
};

/**
 * Model hook callback function.
 */
export type ModelHookCallback = HookCallback<ModelInstance>;

/**
 * Model's hooks definition.
 */
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

/**
 * Extendable model class holding the configuration and schema.
 */
export type ModelClass<D extends {} = any> = Hookable<ModelHooksDefinition> & {
  /**
   * Internal type identifier for FuncModel's type guards.
   */
  readonly $MODEL_TYPE: 'model';
  readonly $config: ModelConfig;
  readonly $schema: ModelSchema<D>;
  extends<ND extends {} = {}>(
    extendsFrom?: ND & ThisType<ModelInstance<D & ND>>,
  ): Model<D & ND, ModelInstance<D & ND>>;
};

/**
 * Model class of a dedicated instance.
 * This type is used to keep instance generic typing across actions enhancements.
 */
export type Model<D extends {} = any, I extends ModelInstance<D> = any> =
  & ModelClass<D>
  & Constructor<I>;

/**
 * Model instance for a dedicated model class.
 * This type is used to keep instance generic typing across actions enhancements.
 */
export type ModelClassInstance<D extends {} = any> = {
  readonly $model: ModelClass<D>;
};

/**
 * Model instance holding state and values.
 */
export type ModelInstance<D extends {} = any> = {
  /**
   * Internal type identifier for FuncModel's type guards.
   */
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

/**
 * Infer the definition from a model class or model instance.
 */
export type ModelInferDefinition<M> = M extends ModelClass<infer D>
  ? D
  : M extends ModelClassInstance<infer D>
    ? D
    : {};

/**
 * Infer the schema from a model class or model instance.
 */
export type ModelInferSchema<M> = ModelSchema<ModelInferDefinition<M>>;

/**
 * Model class or instance values map (only attributes/relations).
 */
export type ModelValues<M> = {
  [K in keyof ModelInferDefinition<M>]:
  ModelInferDefinition<M>[K] extends ModelAttribute<infer T, any>
    ? T : ModelInferDefinition<M>[K] extends ModelRelation<infer T>
      ? T : never;
};

/**
 * Model class or instance attributes/relations key.
 */
export type ModelKey<M> = {
  [K in keyof ModelInferDefinition<M>]:
  ModelInferDefinition<M>[K] extends ModelAttribute<any, any>
    ? K : ModelInferDefinition<M>[K] extends ModelRelation<any>
      ? K : never;
}[keyof ModelInferDefinition<M>];

/**
 * Model class or instance relations key (only direct relations).
 *
 * @example
 * const keys: ModelRelationKey<Post>[] = ['comments', 'tags'];
 */
export type ModelRelationKey<M> =
  keyof ModelInferSchema<M> extends infer K
    ? K extends string & keyof ModelInferSchema<M>
      ? ModelInferSchema<M>[K] extends never
        ? never
        : ModelInferSchema<M>[K] extends ModelRelation
          ? K
          : never : never : never;

/**
 * Model class or instance relations key (supports nested relation using dot separator).
 *
 * @example
 * const keys: ModelRelationDotKey<Post>[] = ['comments', 'comments.author', 'tags'];
 */
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
