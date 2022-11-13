import FetchAdapter from '@/json-api/adapter/fetchAdapter';
import { FetchAdapterOptions } from '@/json-api/adapter/types';

export default function makeFetchAdapter(options: FetchAdapterOptions = {}) {
  return new FetchAdapter(options);
}
