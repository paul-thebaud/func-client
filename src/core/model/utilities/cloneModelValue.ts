import { ModelClass } from '@/core/model/types';

export default function cloneModelValue<T>(model: ModelClass, value: T) {
  if (model.$config.cloner) {
    return model.$config.cloner(value);
  }

  return value;
}
