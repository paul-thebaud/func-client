import prop, { OptionsVariadic, PropOptions } from '@/core/model/props/prop';
import { ModelAttribute } from '@/core/model/types';

export type AttrOptions<T, S> = PropOptions<T, S>;

function attr<T, S = unknown>(
  ...options: OptionsVariadic<T, S, AttrOptions<T, S>>
): ModelAttribute<T, S> {
  return {
    ...prop(...options),
    $MODEL_TYPE: 'attribute',
  };
}

export default attr;
