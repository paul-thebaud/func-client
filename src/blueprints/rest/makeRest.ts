import makeCache from '@/blueprints/makeCache';
import makeRegistry from '@/blueprints/makeRegistry';
import { Action, withAdapter, withCache, withDeserializer, withRegistry, withSerializer } from '@/core';
import { HttpAdapterOptions } from '@/http';
import { RestAdapter, RestDeserializer, RestSerializer } from '@/rest';

type RestFactoryOptions = HttpAdapterOptions;

export default function makeRest(options: RestFactoryOptions = {}) {
  const cache = makeCache();

  const registry = makeRegistry();

  const adapter = new RestAdapter(options);

  const deserializer = new RestDeserializer();

  const serializer = new RestSerializer();

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
