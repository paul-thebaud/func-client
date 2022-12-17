import { ModelInstance } from '@/core';

export default function serializeRef(model: ModelInstance) {
  return {
    type: model.$model.$config.type,
    id: model.id,
  };
}
