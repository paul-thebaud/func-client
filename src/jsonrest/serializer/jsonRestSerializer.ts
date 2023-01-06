import { ModelInstance, ModelRelation } from '@/core';
import { JsonSerializer } from '@/json';
import { JsonRestNewResource } from '@/jsonrest/types';

export default class JsonRestSerializer extends JsonSerializer<JsonRestNewResource> {
  /**
   * @inheritDoc
   */
  protected async makeResource(instance: ModelInstance) {
    return { id: instance.id };
  }

  /**
   * @inheritDoc
   */
  protected async hydratePropInResource(
    resource: JsonRestNewResource,
    serializedKey: string,
    serializedValue: unknown,
  ) {
    Object.assign(resource, {
      [serializedKey]: serializedValue,
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
    // TODO Object or ID? Type?
    return related.id;
  }
}
