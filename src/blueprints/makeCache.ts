import RefsCache from '@/core/cache/refsCache';
import weakRefCacheMode from '@/core/cache/weakRefMode';

export default function makeCache() {
  return new RefsCache({ mode: weakRefCacheMode });
}
