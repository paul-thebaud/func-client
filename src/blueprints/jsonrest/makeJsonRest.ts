import makeCache from '@/blueprints/makeCache';
import makeRegistry from '@/blueprints/makeRegistry';
import { Action, withAdapter, withCache, withDeserializer, withRegistry, withSerializer } from '@/core';
import { JsonRestAdapter, JsonRestDeserializer, JsonRestSerializer } from '@/jsonrest';

type JsonRestFactoryConfig = {
  baseURL?: string;
};

export default function makeJsonRest(config: JsonRestFactoryConfig = {}) {
  const cache = makeCache();

  const registry = makeRegistry();

  const adapter = new JsonRestAdapter({
    baseURL: config.baseURL,
  });

  const deserializer = new JsonRestDeserializer();

  const serializer = new JsonRestSerializer();

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
