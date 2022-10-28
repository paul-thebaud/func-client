import BelongsTo from '@/core/attributes/belongsTo';
import HasMany from '@/core/attributes/hasMany';
import makeDescriptor from '@/core/attributes/makeDescriptor';
import Relationship from '@/core/attributes/relationship';
import Builder from '@/core/builder';
import BaseConnection from '@/core/connection/baseConnection';
import { Pagination } from '@/core/pagination/pagination';
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
  alias: string | undefined;
};

export type RelationshipOptions = {
  inverse: string | null;
  defaultValue: unknown;
  syncTo: boolean;
  syncFrom: boolean;
  alias: string | undefined;
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
    const model = new this(false);

    model.init(initOptions);
    model.fill(initValues);

    return model;
  }

  public constructor(warnAboutNew: boolean = true) {
    super();

    if (warnAboutNew) {
      console.warn(`[model.] Calling \`new ${this.constructor.name}()\` will not correctly initialize the model. You should use \`${this.constructor.name}.make()\` instead`);
    }
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

    this.initAttributes();
    this.initRelationships();

    if (initOptions.noDefaults !== true) {
      this.initValues();
    }
  }

  private initAttributes() {
    Object.entries(this.$schema.attributes)
      .forEach(([key, def]) => this.initAttribute(key, def));
  }

  private initAttribute(key: string, def: AttributeDef) {
    Object.defineProperty(this, key, def.makePropertyDescriptor(this));
  }

  private initRelationships() {
    Object.entries(this.$schema.relationships)
      .forEach(([key, def]) => this.initRelationship(key, def));
  }

  private initRelationship(key: string, def: RelationshipDef) {
    Object.defineProperty(this, key, def.makePropertyDescriptor(this));
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
      alias: options?.alias,
      makePropertyDescriptor: () => makeDescriptor(
        (m) => m.getValue(key),
        (m, v) => m.setValue(key, v),
      ),
    });

    return this;
  }

  private defineRelationship(
    key: string,
    newReference: (model: Model) => Relationship,
    options?: Partial<RelationshipOptions>,
  ) {
    this.registerRelationship(key, {
      inverse: options?.inverse,
      defaultValue: options?.defaultValue,
      syncTo: options?.syncTo !== undefined ? options.syncTo : true,
      syncFrom: options?.syncFrom !== undefined ? options.syncFrom : true,
      alias: options?.alias,
      makePropertyDescriptor: (model) => {
        const relationshipRef = newReference(model);

        return makeDescriptor(
          () => relationshipRef,
          () => {
            throw new Error('TODO rel setter not available');
          },
        );
      },
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
