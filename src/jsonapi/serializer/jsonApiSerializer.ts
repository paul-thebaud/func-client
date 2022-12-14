import { ModelInstance, ModelRelation } from '@/core';
import { JsonSerializer } from '@/json';
import { JsonApiDocument, JsonApiNewResource } from '@/jsonapi/types';
import { isNil } from '@/utilities';

/**
 * Serializer implementation for JSON:API.
 */
export default class JsonApiSerializer extends JsonSerializer<JsonApiDocument> {
  /**
   * @inheritDoc
   */
  protected async makeResource(instance: ModelInstance) {
    return {
      data: {
        type: instance.$model.$config.type,
        id: !isNil(instance.id) ? String(instance.id) : undefined,
        attributes: {},
        relationships: {},
      },
    };
  }

  /**
   * @inheritDoc
   */
  protected async hydrateAttributeInResource(
    resource: JsonApiDocument,
    serializedKey: string,
    serializedValue: unknown,
  ) {
    Object.assign((resource.data as JsonApiNewResource)!.attributes!, {
      [serializedKey]: serializedValue,
    });
  }

  /**
   * @inheritDoc
   */
  protected async hydrateRelationInResource(
    resource: JsonApiDocument,
    serializedKey: string,
    serializedValue: unknown,
  ) {
    Object.assign((resource.data as JsonApiNewResource)!.relationships!, {
      [serializedKey]: { data: serializedValue },
    });
  }

  /**
   * @inheritDoc
   */
  protected async serializeRelatedInstance(
    _instance: ModelInstance,
    _key: string,
    _def: ModelRelation,
    related: ModelInstance,
  ) {
    return {
      type: related.$model.$config.type,
      id: related.id,
    };
  }
}
