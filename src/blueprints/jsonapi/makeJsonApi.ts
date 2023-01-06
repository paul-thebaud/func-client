import makeCache from '@/blueprints/makeCache';
import makeRegistry from '@/blueprints/makeRegistry';
import { Action, withAdapter, withCache, withDeserializer, withRegistry, withSerializer } from '@/core';
import { deepParamsSerializer } from '@/http';
import { JsonApiAdapter, JsonApiDeserializer, JsonApiSerializer } from '@/jsonapi';

type JsonApiFactoryOptions = {
  baseURL?: string;
};

export default function makeJsonApi(options: JsonApiFactoryOptions = {}) {
  const cache = makeCache();

  const registry = makeRegistry();

  const adapter = new JsonApiAdapter({
    baseURL: options.baseURL,
    paramsSerializer: deepParamsSerializer,
  });

  const deserializer = new JsonApiDeserializer();

  const serializer = new JsonApiSerializer();

  function makeAction() {
    return new Action()
      .use(withCache(cache))
      .use(withRegistry(registry))
      .use(withAdapter(adapter))
      .use(withDeserializer(deserializer))
      .use(withSerializer(serializer));
  }

  return {
    cache,
    registry,
    adapter,
    deserializer,
    serializer,
    makeAction,
  };
}