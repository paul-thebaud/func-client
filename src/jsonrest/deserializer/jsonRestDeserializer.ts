import { ModelInstance } from '@/core';
import { JsonDeserializer, JsonExtractedData } from '@/json';
import { JsonRestDocument, JsonRestNewResource } from '@/jsonrest/types';

export default class JsonRestDeserializer extends JsonDeserializer<Response, JsonRestNewResource> {
  /**
   * @inheritDoc
   */
  protected async makeDeserializedData(instances: ModelInstance[]) {
    return { instances };
  }

  /**
   * @inheritDoc
   */
  protected async extractData(response: Response): Promise<JsonExtractedData<JsonRestNewResource>> {
    const document: JsonRestDocument = response.status === 204 ? {} : await response.json();

    return {
      resources: document.data,
    };
  }

  /**
   * @inheritDoc
   */
  protected async extractOptionalIdentifier(resource: JsonRestNewResource) {
    return resource;
  }

  /**
   * @inheritDoc
   */
  protected async extractPropValue(resource: JsonRestNewResource, serializedKey: string) {
    return resource[serializedKey];
  }
}
