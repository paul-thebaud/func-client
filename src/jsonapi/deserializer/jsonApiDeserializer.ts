import { DeserializedData, DeserializerError, ModelInstance } from '@/core';
import { JsonDeserializer, JsonExtractedData } from '@/json';
import { JsonApiDocument, JsonApiNewResource, JsonApiResource, JsonApiResourceIdentifier } from '@/jsonapi/types';
import { IdentifiersMap, wrap } from '@/utilities';

export type JsonApiExtractedData = JsonExtractedData<JsonApiNewResource> & {
  included: IdentifiersMap<JsonApiResource>;
  document: JsonApiDocument;
  response: Response;
};

export type JsonApiDeserializedData<I extends ModelInstance = ModelInstance> =
  & DeserializedData<I>
  & { document: JsonApiDocument; response: Response; };

export default class JsonApiDeserializer extends JsonDeserializer
  <Response, JsonApiNewResource, JsonApiExtractedData, JsonApiDeserializedData> {
  /**
   * @inheritDoc
   */
  protected async makeDeserializedData(
    instances: ModelInstance[],
    extractedData: JsonApiExtractedData,
  ) {
    return {
      instances,
      document: extractedData.document,
      response: extractedData.response,
    };
  }

  /**
   * @inheritDoc
   */
  protected async extractData(response: Response) {
    const document: JsonApiDocument = response.status === 204 ? {} : await response.json();

    const included = new IdentifiersMap<JsonApiResource>();
    document.included?.map((r) => included.set(r.type, r.id, r));

    return {
      resources: document.data,
      included,
      document,
      response,
    };
  }

  /**
   * @inheritDoc
   */
  protected async extractOptionalIdentifier(resource: JsonApiNewResource) {
    return resource;
  }

  /**
   * @inheritDoc
   */
  protected async extractAttributeValue(
    _extractedData: JsonApiExtractedData,
    resource: JsonApiNewResource,
    serializedKey: string,
  ) {
    return resource.attributes?.[serializedKey];
  }

  /**
   * @inheritDoc
   */
  protected async extractRelationValue(
    extractedData: JsonApiExtractedData,
    resource: JsonApiNewResource,
    serializedKey: string,
  ) {
    const extractIncluded = ({ type, id }: JsonApiResourceIdentifier) => {
      const includedResource = extractedData.included.get(type, id);
      if (includedResource) {
        return includedResource;
      }

      const rootResource = wrap(extractedData.resources)
        .find((r) => r.type === type && r.id === id);
      if (rootResource) {
        return rootResource;
      }

      throw new DeserializerError(
        `Could not find included resource with type \`${type}\` and ID \`${id}\`. Your document seems malformed.`,
      );
    };

    const relationRef = resource.relationships?.[serializedKey]?.data;
    if (Array.isArray(relationRef)) {
      return relationRef.map(extractIncluded);
    }

    if (relationRef) {
      return extractIncluded(relationRef);
    }

    return relationRef;
  }
}
