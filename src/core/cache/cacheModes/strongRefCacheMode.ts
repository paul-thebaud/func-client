import { ModelInstance } from '@/core/model/types';

export default {
  ref: (instance: ModelInstance) => ({ instance }),
  deref: (ref: { instance: ModelInstance }) => ref.instance,
};
