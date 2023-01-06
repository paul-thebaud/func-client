import { RefsCache, RefsCacheOptions } from '@/core';

export default function makeCache(options: RefsCacheOptions = {}) {
  return new RefsCache(options);
}
