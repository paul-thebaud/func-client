import { ModelAttribute } from '@/core/model/types';

export type AttrOptions<T> = {
  default?: T;
};

export default function attr<T>(
  options: AttrOptions<T> = {},
): ModelAttribute<T> {
  return {
    $MODEL_TYPE: 'attribute',
    default: options.default,
  };
}
