import Builder from '@/core/builder';
import BaseConnection from '@/core/connection/baseConnection';
import { Pagination } from '@/core/pagination/pagination';
import BelongsTo from '@/core/relationships/belongsTo';
import HasMany from '@/core/relationships/hasMany';
import Relationship from '@/core/relationships/relationship';
import TrackableState from '@/core/state/trackableState';
import { Transformer } from '@/core/transformers/transformer';
import { ReactivityFactory } from '@/core/types/reactivity';
import { RecordId, RecordType } from '@/core/types/record';
import { AttributeDef, RecordSchema, RelationshipDef } from '@/core/types/schema';
import { Constructor } from '@/core/types/utilities/constructor';
import { Dictionary } from '@/core/types/utilities/dictionary';

export type InitOptions = {
  noInit: boolean;
  noDefaults: boolean;
};

export type AttributeOptions = {
  cast: Transformer | string | undefined;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
};

export type RelationshipOptions = {
  inverse: string | null;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
};

export default abstract class Model extends TrackableState {
  public static reactivityFactory = undefined as ReactivityFactory | undefined;

  public static connection: BaseConnection;

  /**
   * The unique type of model.
   */
  public abstract type: RecordType;

  /**
   * The unique ID of model.
   *
   * TODO Use get/set to update instance cache.
   */
  protected $id = null as RecordId | null;

  private $schema: RecordSchema;

  public get id() {
    return this.$id;
  }

  public set id(id: RecordId | null) {
    this.$id = id;
  }

  public static make<M extends Constructor<Model>>(
    this: M,
    initValues: Dictionary = {},
    initOptions: Partial<InitOptions> = {},
  ) {
    return new this(initValues, initOptions);
  }

  public newInstance<M extends Model>(
    this: M,
    initValues: Dictionary = {},
    initOptions: Partial<InitOptions> = {},
  ) {
    return new (this.constructor as Constructor<M>)(
      initValues,
      initOptions,
    );
  }

  public constructor(
    initValues: Dictionary = {},
    initOptions: Partial<InitOptions> = {},
  ) {
    super();

    this.init(initOptions);
    this.fill(initValues);
  }

  /*
   |--------------------------------------------------------------------------
   | Model init.
   |
   | Instance initialization (default values, etc.).
   |--------------------------------------------------------------------------
   */

  protected registerSchema() {
  }

  protected initReactivity() {
    const { reactivityFactory } = this.constructor as typeof Model;
    if (reactivityFactory) {
      this.$state = reactivityFactory(this.$state);
      this.$values = reactivityFactory(this.$values);
    }
  }

  private init(initOptions: Partial<InitOptions>) {
    if (initOptions.noInit) {
      return;
    }

    this.initReactivity();
    this.initSchema();
    this.registerSchema();

    this.initRelationships();

    if (initOptions.noDefaults !== true) {
      this.initValues();
    }
  }

  private initRelationships() {
    Object.entries(this.$schema.relationships)
      .forEach(([key, def]) => this.initRelationship(key, def));
  }

  private initRelationship(key: string, def: RelationshipDef) {
    const relationship = def.newReference(this);

    this.defineProperty(key, () => relationship, () => {
      // TODO Throw.
    });
  }

  private initValues() {
    Object.entries(this.$schema.attributes)
      .forEach(([key, def]) => this.initValue(key, def));
    Object.entries(this.$schema.relationships)
      .forEach(([key, def]) => this.initValue(key, def));
  }

  private initValue(key: string, def: AttributeDef | RelationshipDef) {
    // TODO Warn about non function array/object.
    const defaultValue = typeof def.defaultValue === 'function'
      ? def.defaultValue()
      : def.defaultValue;

    if (defaultValue !== undefined) {
      this.setValue(key, defaultValue);
    }
  }

  private defineProperty(
    key: string,
    get: (m: Model) => unknown,
    set: (m: Model, v: unknown) => void,
  ) {
    Object.defineProperty(this, key, {
      get(this: Model) {
        return get(this);
      },
      set(this: Model, value: unknown) {
        return set(this, value);
      },
    });
  }

  /*
   |--------------------------------------------------------------------------
   | Model schema.
   |
   | Structure of a model with details on attributes and
   | relationships (default values for init, casts, etc.).
   |--------------------------------------------------------------------------
   */

  private initSchema(): void {
    this.$schema = this.$schema || {
      attributes: {},
      relationships: {},
    };
  }

  public registerAttribute(key: string, def: AttributeDef) {
    this.initSchema();
    this.$schema.attributes[key] = def;
  }

  public getAttributesDefs(): Dictionary<AttributeDef> {
    return this.$schema.attributes;
  }

  public registerRelationship(key: string, def: RelationshipDef) {
    this.initSchema();
    this.$schema.relationships[key] = def;
  }

  public getRelationshipsDefs(): Dictionary<RelationshipDef> {
    return this.$schema.relationships;
  }

  /*
   |--------------------------------------------------------------------------
   | Model schema registration.
   |
   | Methods to quickly register the model schema on initialization.
   | When using Typescript, those methods are called by decorators.
   | When using Javascript, those methods must be called in the
   | `registerSchema` method override.
   |--------------------------------------------------------------------------
   */

  public attr(
    key: string,
    transformer?: Transformer | string,
    options?: Partial<AttributeOptions>,
  ) {
    this.registerAttribute(key, {
      transformer,
      defaultValue: options?.defaultValue,
      syncTo: options?.syncTo !== undefined ? options.syncTo : true,
      syncFrom: options?.syncFrom !== undefined ? options.syncFrom : true,
    });

    this.defineProperty(key, (m) => m.getValue(key), (m, v) => m.setValue(key, v));

    return this;
  }

  private defineRelationship(
    key: string,
    newReference: (model: Model) => Relationship,
    options?: Partial<RelationshipOptions>,
  ) {
    this.registerRelationship(key, {
      newReference,
      inverse: options?.inverse,
      defaultValue: options?.defaultValue,
      syncTo: options?.syncTo !== undefined ? options.syncTo : true,
      syncFrom: options?.syncFrom !== undefined ? options.syncFrom : true,
    });

    return this;
  }

  public belongsTo(
    key: string,
    options?: Partial<RelationshipOptions>,
  ) {
    return this.defineRelationship(
      key,
      (model) => new BelongsTo(model, key),
      options,
    );
  }

  public hasMany(
    key: string,
    options?: Partial<RelationshipOptions>,
  ) {
    return this.defineRelationship(
      key,
      (model) => new HasMany(model, key),
      options,
    );
  }

  /*
   |--------------------------------------------------------------------------
   | Model values.
   |
   | Values of a model instance's attributes and relationships.
   |--------------------------------------------------------------------------
   */

  protected $values = {} as Dictionary;

  /**
   * Set a value on the model.
   *
   * @param key
   * @param value
   *
   * @internal
   */
  public setValue(
    key: string,
    value: unknown,
  ) {
    this.$values[key] = value;
  }

  /**
   * Get an attribute of the model.
   *
   * @param key
   *
   * @internal
   */
  public getValue(key: string) {
    return this.$values[key];
  }

  public fill(values: Dictionary) {
    Object.entries(values).forEach(([key, value]) => this.setValue(key, value));

    return this;
  }

  /*
   |--------------------------------------------------------------------------
   | Connection and queries.
   |
   | Query building/running through the connection.
   |--------------------------------------------------------------------------
   */

  public pagination: Pagination | undefined;

  public static query<M extends Model>(this: Constructor<M>) {
    return new this().newQuery();
  }

  public newQuery<M extends Model>(this: M): Builder<M, M['pagination']> {
    return new Builder(this, this.pagination);
  }

  public save() {
    return this.newQuery().update();
  }

  // TODO Should reload all/record.
  // TODO Query builder.
  // TODO Find/FindBackground
  // TODO FindAll/FindAllBackground
  // TODO ETC.
}
