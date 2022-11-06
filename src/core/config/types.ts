export type DedicatedConfig = {
  cloneWith: <T>(value: T) => T;
  compareWith: (newValue: unknown, previousValue: unknown) => boolean;
};

export type Config = {
  global: DedicatedConfig;
  [k: string]: DedicatedConfig;
};
