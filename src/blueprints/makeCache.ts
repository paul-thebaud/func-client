import { RefsCache, RefsCacheConfig } from '@/core';

/**
 * Make a default cache implementation.
 *
 * @param config
 */
export default function makeCache(config: RefsCacheConfig = {}) {
  return new RefsCache(config);
}
