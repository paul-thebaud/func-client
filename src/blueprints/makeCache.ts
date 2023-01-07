import { RefsCache, RefsCacheConfig } from '@/core';

export default function makeCache(config: RefsCacheConfig = {}) {
  return new RefsCache(config);
}
