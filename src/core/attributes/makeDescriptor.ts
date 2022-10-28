import type Model from '@/core/model';

export default function makeDescriptor(
  get: (model: Model) => unknown,
  set: (model: Model, value: unknown) => void,
): PropertyDescriptor {
  return {
    get(this: Model) {
      return get(this);
    },
    set(this: Model, value: unknown) {
      return set(this, value);
    },
  };
}
