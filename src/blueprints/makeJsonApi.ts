import makeCache from '@/blueprints/makeCache';
import makeDeserializer from '@/blueprints/makeDeserializer';
import makeFetchAdapter from '@/blueprints/makeFetchAdapter';
import makeSerializer from '@/blueprints/makeSerializer';
import makeStore from '@/blueprints/makeStore';
import { Action, withAdapter, withCache, withDeserializer, withSerializer, withStore } from '@/core';
import { FetchAdapterOptions } from '@/json-api/adapter/types';

export default function makeJsonApi(options: FetchAdapterOptions = {}) {
  const store = makeStore();
  const cache = makeCache();
  const adapter = makeFetchAdapter(options);
  const serializer = makeSerializer();
  const deserializer = makeDeserializer();

  const makeAction = () => new Action()
    .use(withStore(store))
    .use(withCache(cache))
    .use(withAdapter(adapter))
    .use(withSerializer(serializer))
    .use(withDeserializer(deserializer));

  return { store, cache, adapter, makeAction };
}
