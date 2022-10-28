import type Model from '@/core/model';
import TrackableState from '@/core/state/trackableState';
import { ReactivityFactory } from '@/core/types/reactivity';

export default abstract class Relationship<R extends Model = Model, M extends Model = Model,
  T = unknown> extends TrackableState {
  public static reactivityFactory = undefined as ReactivityFactory | undefined;

  protected parent: M;

  protected parentKey: string;

  protected related: R | undefined;

  protected relatedKey: string | undefined;

  public constructor(
    parent: M,
    parentKey: string,
    related?: R,
    relatedKey?: string,
  ) {
    super();

    this.parent = parent;
    this.parentKey = parentKey;
    this.related = related;
    this.relatedKey = relatedKey;

    this.initReactivity();
  }

  protected initReactivity() {
    const { reactivityFactory } = this.constructor as typeof Relationship;
    if (reactivityFactory) {
      this.$state = reactivityFactory(this.$state);
    }
  }

  public get value(): T {
    return this.parent.getValue(this.parentKey) as T;
  }

  public set value(value: T) {
    this.parent.setValue(this.parentKey, value);
  }

  public getParent(): M {
    return this.parent;
  }

  public getParentKey(): string {
    return this.parentKey;
  }

  public getRelated(): R | undefined {
    return this.related;
  }

  public getRelatedKey(): string | undefined {
    return this.relatedKey;
  }
}
