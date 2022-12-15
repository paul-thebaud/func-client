import { ModelInstance } from '@/core';
import { JsonApiResource, JsonApiResourceId, NewJsonApiResource } from '@/json-api/types';

export type JsonApiResourcesOfTypeMap = Map<JsonApiResourceId, JsonApiResource>;
export type JsonApiResourcesMap = Map<string, JsonApiResourcesOfTypeMap>;

export type JsonApiInstancesOfTypeMap = Map<JsonApiResourceId, Promise<ModelInstance>>;
export type JsonApiInstancesMap = Map<string, JsonApiInstancesOfTypeMap>;

export type JsonApiDeserializationData = {
  resources: JsonApiResourcesMap;
  instances: JsonApiInstancesMap;
};

export default function prepareDeserializationData(
  data: (JsonApiResource | NewJsonApiResource)[],
  included: JsonApiResource[],
) {
  const deserializationData: JsonApiDeserializationData = {
    resources: new Map(),
    instances: new Map(),
  };

  const registerResources = (resources: JsonApiResource[]) => {
    resources.forEach((record) => {
      let resourcesMapOfType = deserializationData.resources.get(record.type);
      if (!resourcesMapOfType) {
        resourcesMapOfType = new Map();

        deserializationData.resources.set(record.type, resourcesMapOfType);
      }

      resourcesMapOfType.set(record.id, record);
    });
  };

  registerResources(data as JsonApiResource[]);
  registerResources(included);

  return deserializationData;
}
