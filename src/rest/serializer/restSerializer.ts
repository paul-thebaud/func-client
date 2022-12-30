import { ModelInstance, ModelRelation } from '@/core';
import JsonSerializer from '@/json/serializer/jsonSerializer';
import { RestNewResource } from '@/rest/types';

export default class RestSerializer extends JsonSerializer<RestNewResource> {
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
    resource: RestNewResource,
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
