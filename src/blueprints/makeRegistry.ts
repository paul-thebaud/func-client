import { MapRegistry } from '@/core';

/**
 * Make a default registry implementation.
 */
export default function makeRegistry() {
  return new MapRegistry();
}
