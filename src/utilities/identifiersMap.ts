import type { ModelId } from '@/core';

export default class IdentifiersMap<T> {
  private readonly valuesByTypes: Map<string, Map<ModelId, T>>;

  public constructor() {
    this.valuesByTypes = new Map();
  }

  public get(type: string, id: ModelId) {
    const values = this.valuesByTypes.get(type);

    return values?.get(id) ?? null;
  }

  public set(type: string, id: ModelId, value: T) {
    let values = this.valuesByTypes.get(type);
    if (!values) {
      values = new Map();
      this.valuesByTypes.set(type, values);
    }

    values.set(id, value);
  }

  public delete(type: string, id: ModelId) {
    this.valuesByTypes.get(type)?.delete(id);
  }

  public clear(type: string) {
    this.valuesByTypes.delete(type);
  }
}
