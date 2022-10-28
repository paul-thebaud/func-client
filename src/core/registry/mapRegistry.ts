import { Registry } from '@/core/registry/registry';

export default class MapRegistry<V> implements Registry<string, V> {
  private readonly syncRegistrations: Map<string, V>;

  private readonly asyncRegistrations: Map<string, () => Promise<V>>;

  public constructor() {
    this.syncRegistrations = new Map();
    this.asyncRegistrations = new Map();
  }

  public async get(key: string) {
    let registration = this.syncRegistrations.get(key);
    if (!registration) {
      const asyncRegistration = this.asyncRegistrations.get(key);
      if (!asyncRegistration) {
        throw new Error('TODO model unresolved');
      }

      registration = await asyncRegistration();

      this.registerOneSync(key, registration);
    }

    return registration;
  }

  public registerOneSync(key: string, registration: V): void {
    this.syncRegistrations.set(key, registration);
  }

  public registerOneAsync(key: string, registration: () => Promise<V>): void {
    this.asyncRegistrations.set(key, registration);
  }
}
