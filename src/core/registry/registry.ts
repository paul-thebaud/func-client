export interface Registry<K, V> {
  get(key: K): Promise<V>;
}
