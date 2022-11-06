import { config } from '@/core/config/configure';
import { DedicatedConfig } from '@/core/config/types';

export default function useConfig<K extends keyof DedicatedConfig>(
  key: K,
  forType?: string,
): DedicatedConfig[K] {
  if (forType !== undefined && config[forType] !== undefined && key in config[forType]) {
    return config[forType][key];
  }

  return config.global[key];
}
