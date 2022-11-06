import { ModelInstance } from '@/core';

export default function serializeRef(model: ModelInstance) {
  return {
    type: model.constructor.$type,
    id: model.id,
  };
}
