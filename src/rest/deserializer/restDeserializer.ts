import { ModelInstance } from '@/core';
import JsonDeserializer, { ExtractedData } from '@/json/deserializer/jsonDeserializer';
import { RestDocument, RestNewResource } from '@/rest/types';

export default class RestDeserializer extends JsonDeserializer<Response, RestNewResource> {
  /**
   * @inheritDoc
   */
  protected async makeDeserializedData(instances: ModelInstance[]) {
    return { instances };
  }

  /**
   * @inheritDoc
   */
  protected async extractData(response: Response): Promise<ExtractedData<RestNewResource>> {
    const document: RestDocument = await response.json();

    return {
      resources: document.data,
    };
  }

  /**
   * @inheritDoc
   */
  protected async extractOptionalIdentifier(resource: RestNewResource) {
    return resource;
  }

  /**
   * @inheritDoc
   */
  protected async extractPropValue(resource: RestNewResource, serializedKey: string) {
    return resource[serializedKey];
  }
}
