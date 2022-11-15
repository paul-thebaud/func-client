import InstancesCache from '@/core/cache/instancesCache';
import weakRefCacheMode from '@/core/cache/weakRefMode';

export default function makeCache() {
  return new InstancesCache({ mode: weakRefCacheMode });
}
