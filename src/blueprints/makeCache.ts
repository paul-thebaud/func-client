import weakRefCacheMode from '@/core/cache/cacheModes/weakRefCacheMode';
import InstancesCache from '@/core/cache/instancesCache';

export default function makeCache() {
  return new InstancesCache({ mode: weakRefCacheMode });
}
