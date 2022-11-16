import { Model } from '@/core/model/types';

export default function compareModelValue(model: Model, newValue: unknown, prevValue: unknown) {
  if (model.$config.comparator) {
    return model.$config.comparator(newValue, prevValue);
  }

  return newValue === prevValue;
}
