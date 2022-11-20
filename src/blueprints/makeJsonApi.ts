import makeCache from '@/blueprints/makeCache';
import makeStore from '@/blueprints/makeStore';
import toKebab from '@/blueprints/utilities/toKebab';
import { Action, Dictionary, withAdapter, withCache, withDeserializer, withSerializer, withStore } from '@/core';
import {
  Adapter,
  Deserializer,
  FetchHttpClient,
  paramsSerializer,
  Serializer,
  TransformError,
  TransformRequest,
  TransformResponse,
} from '@/json-api';

export type MakeJsonApiOptions = {
  fetch?: typeof fetch;
  paramsSerializer?: (params: Dictionary) => string | undefined;
  baseURL?: string;
  transformRequests?: TransformRequest[];
  transformResponses?: TransformResponse<Response>[];
  transformErrors?: TransformError<Response>[];
  transformTypeInPath?: (type: string) => string;
  transformRelationInPath?: (relation: string) => string;
  transformKeys?: (localKey: string) => string;
};

export default function makeJsonApi(options: MakeJsonApiOptions = {}) {
  const store = makeStore();

  const cache = makeCache();

  const httpClient = new FetchHttpClient({
    fetch: options.fetch,
    paramsSerializer: options.paramsSerializer ?? paramsSerializer,
  });

  const adapter = new Adapter({
    httpClient,
    transformTypeInPath: options.transformTypeInPath,
    transformRelationInPath: options.transformRelationInPath ?? toKebab,
    ...options,
  });

  const serializer = new Serializer({
    transformKeys: options.transformKeys,
  });
  const deserializer = new Deserializer({
    transformKeys: options.transformKeys,
  });

  const makeAction = () => new Action()
    .use(withStore(store))
    .use(withCache(cache))
    .use(withAdapter(adapter))
    .use(withSerializer(serializer))
    .use(withDeserializer(deserializer));

  return { store, cache, makeAction };
}
