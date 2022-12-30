import { NewNormalizerI } from '@/core';
import wrap from '@/core/utilities/wrap';
import { JsonNormalizedData, JsonNormalizedRecord } from '@/json/types';
import { JsonApiDocument, JsonApiNewResource } from '@/jsonapi/types';

export default class JsonApiNormalizer implements NewNormalizerI<Response, JsonNormalizedData> {
  public async normalize(response: Response) {
    const rawData: JsonApiDocument = response.status !== 204 ? await response.json() : {};

    return {
      data: this.normalizeResources(wrap(rawData?.data)),
      included: this.normalizeResources(wrap(rawData?.data)),
    };
  }

  protected normalizeResources(resources: JsonApiNewResource[]): JsonNormalizedRecord[] {
    return resources.map((r) => this.normalizeResource(r));
  }

  protected normalizeResource(resource: JsonApiNewResource): JsonNormalizedRecord {
    return {
      // TODO Should we normalize keys, type, etc.?
      type: resource.type,
      id: resource.id,
      ...resource.attributes,
      ...resource.relationships,
    };
  }
}
