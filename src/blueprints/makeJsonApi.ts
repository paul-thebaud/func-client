import makeCache from '@/blueprints/makeCache';
import makeRegistry from '@/blueprints/makeRegistry';
import toKebab from '@/blueprints/utilities/toKebab';
import { Action, withAdapter, withCache, withDeserializer, withRegistry, withSerializer } from '@/core';
import { Dictionary } from '@/core/utilities/types';
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
  const registry = makeRegistry();

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
    .use(withRegistry(registry))
    .use(withCache(cache))
    .use(withAdapter(adapter))
    .use(withSerializer(serializer))
    .use(withDeserializer(deserializer));

  return { cache, registry, makeAction };
}
