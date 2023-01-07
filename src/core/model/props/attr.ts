import { ModelAttribute, ModelProp } from '@/core/model/types';
import { Transform } from '@/core/transforms/types';

export type AttrConfig<T, S> = ModelProp<T> & {
  transformer?: Transform<T, S> | undefined;
};

export type AttrConfigVariadic<T, S> =
  | []
  | [AttrConfig<T, S>]
  | [Transform<T | undefined, S>]
  | [Transform<T | undefined, S>, Omit<AttrConfig<T, S>, 'transformer'>];

function attr<T, S = unknown>(
  ...config: AttrConfigVariadic<T, S>
): ModelAttribute<T, S> {
  const attribute: ModelAttribute<T, S> = { $MODEL_TYPE: 'attribute' };

  if (config.length === 0) {
    return attribute;
  }

  if (config.length === 1) {
    if (typeof config[0] === 'function'
      || ('serialize' in config[0] && 'deserialize' in config[0])
    ) {
      [attribute.transformer] = config;

      return attribute;
    }

    return { ...attribute, ...config[0] };
  }

  const transformer = config[0];

  return {
    transformer,
    ...attribute,
    ...config[1],
  };
}

export default attr;
