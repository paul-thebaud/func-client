import { Config, DedicatedConfig } from '@/core/config/types';

export const config: Config = {
  global: {
    cloneWith: <T>(value: T) => value,
    compareWith: (newValue: unknown, previousValue: unknown) => newValue === previousValue,
  },
};

export default function configure(newConfig: Partial<DedicatedConfig>, forType?: string) {
  if (forType) {
    config[forType] = { ...config[forType], ...newConfig };
  } else {
    config.global = { ...config.global, ...newConfig };
  }
}
