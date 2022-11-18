import { ModelAttribute, ModelProp } from '@/core/model/types';
import { Transform } from '@/core/transforms/types';

export type AttrOptions<T, S> = ModelProp<T> & {
  transformer?: Transform<T, S> | undefined;
};

export type AttrOptionsVariadic<T, S> =
  | []
  | [AttrOptions<T, S>]
  | [Transform<T | undefined, S>]
  | [Transform<T | undefined, S>, Omit<AttrOptions<T, S>, 'transformer'>];

function attr<T, S = unknown>(
  ...options: AttrOptionsVariadic<T, S>
): ModelAttribute<T, S> {
  const attribute: ModelAttribute<T, S> = { $MODEL_TYPE: 'attribute' };

  if (options.length === 0) {
    return attribute;
  }

  if (options.length === 1) {
    if (typeof options[0] === 'function'
      || ('serialize' in options[0] && 'deserialize' in options[0])
    ) {
      [attribute.transformer] = options;

      return attribute;
    }

    return { ...attribute, ...options[0] };
  }

  const transformer = options[0];

  return {
    transformer,
    ...attribute,
    ...options[1],
  };
}

export default attr;
