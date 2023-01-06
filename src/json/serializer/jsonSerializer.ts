/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionContext,
  changed,
  eachAttributes,
  eachRelations,
  ModelAttribute,
  ModelInstance,
  ModelProp,
  ModelRelation,
  SerializerI,
  SerializerError,
  useTransform,
} from '@/core';
import normalizeKey from '@/json/normalizer/normalizeKey';

export default abstract class JsonSerializer<Data> implements SerializerI<Data> {
  public async serialize(instance: ModelInstance, context: ActionContext) {
    const resource = await this.makeResource(instance, context);

    await Promise.all(eachAttributes(instance, async (key, def) => {
      const rawValue = instance[key];
      if (await this.shouldSerializeAttribute(instance, key, def, rawValue, context)) {
        const serializedKey = await this.serializeAttributeKey(instance, key, def, context);
        const serializedValue = await this.serializeAttributeValue(
          instance,
          key,
          def,
          rawValue,
          context,
        );

        await this.hydrateAttributeInResource(resource, serializedKey, serializedValue);
      }
    }));

    await Promise.all(eachRelations(instance, async (key, def) => {
      const rawValue = instance[key];
      if (await this.shouldSerializeRelation(instance, key, def, rawValue, context)) {
        const serializedKey = await this.serializeRelationKey(instance, key, def, context);
        const serializedValue = await this.serializeRelationValue(
          instance,
          key,
          def,
          rawValue,
          context,
        );

        await this.hydrateRelationInResource(resource, serializedKey, serializedValue);
      }
    }));

    return resource;
  }

  protected abstract makeResource(instance: ModelInstance, context: ActionContext): Promise<Data>;

  protected abstract serializeRelatedInstance(
    instance: ModelInstance,
    key: string,
    def: ModelRelation,
    related: ModelInstance,
    context: ActionContext,
  ): Promise<unknown>;

  protected hydratePropInResource(
    _resource: Data,
    _serializedKey: string,
    _serializedValue: unknown,
  ): Promise<void> {
    throw new SerializerError(
      'You should either implement `hydratePropInResource` or `hydrateAttributeInResource` and `hydrateRelationInResource` in your JsonSerializer implementation.',
    );
  }

  protected async hydrateAttributeInResource(
    resource: Data,
    serializedKey: string,
    serializedValue: unknown,
  ) {
    await this.hydratePropInResource(resource, serializedKey, serializedValue);
  }

  protected async hydrateRelationInResource(
    resource: Data,
    serializedKey: string,
    serializedValue: unknown,
  ) {
    await this.hydratePropInResource(resource, serializedKey, serializedValue);
  }

  protected serializeAttributeKey(
    instance: ModelInstance,
    key: string,
    def: ModelProp,
    context: ActionContext,
  ) {
    return this.serializePropKey(instance, key, def, context);
  }

  protected serializeRelationKey(
    instance: ModelInstance,
    key: string,
    def: ModelProp,
    context: ActionContext,
  ) {
    return this.serializePropKey(instance, key, def, context);
  }

  protected async serializePropKey(
    instance: ModelInstance,
    key: string,
    def: ModelProp,
    _context: ActionContext,
  ) {
    return normalizeKey(instance, key, def);
  }

  protected shouldSerializeAttribute(
    instance: ModelInstance,
    key: string,
    def: ModelAttribute,
    rawValue: unknown,
    context: ActionContext,
  ) {
    return this.shouldSerializeProp(instance, key, def, rawValue, context);
  }

  protected shouldSerializeRelation(
    instance: ModelInstance,
    key: string,
    def: ModelRelation,
    rawValue: unknown,
    context: ActionContext,
  ) {
    return this.shouldSerializeProp(instance, key, def, rawValue, context);
  }

  protected async shouldSerializeProp(
    instance: ModelInstance,
    key: string,
    def: ModelProp,
    rawValue: unknown,
    _context: ActionContext,
  ) {
    return !def.readOnly
      && rawValue !== undefined
      && changed(instance, key);
  }

  protected async serializeAttributeValue(
    _instance: ModelInstance,
    _key: string,
    def: ModelAttribute,
    rawValue: unknown,
    _context: ActionContext,
  ) {
    const transform = useTransform(def.transformer, 'serialize');

    return transform(rawValue);
  }

  protected async serializeRelationValue(
    instance: ModelInstance,
    key: string,
    def: ModelRelation,
    rawValue: unknown,
    context: ActionContext,
  ) {
    const serializeRelatedInstance = (related: ModelInstance) => this.serializeRelatedInstance(
      instance,
      key,
      def,
      related,
      context,
    );
    if (Array.isArray(rawValue)) {
      return Promise.all(rawValue.map(serializeRelatedInstance));
    }

    if (rawValue) {
      return serializeRelatedInstance(rawValue as ModelInstance);
    }

    return rawValue;
  }
}
