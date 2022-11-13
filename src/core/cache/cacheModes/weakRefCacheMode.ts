import { ModelInstance } from '@/core/model/types';

export default {
  ref: (instance: ModelInstance) => new WeakRef(instance),
  deref: (ref: WeakRef<ModelInstance>) => ref.deref(),
};
