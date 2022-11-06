import { DefaultFactory, ModelProp } from '@/core/model/types';
import { Transform } from '@/core/transforms/types';

export type PropOptions<T, S> = {
  default?: T | DefaultFactory<T> | undefined;
  transformer?: Transform<T, S> | undefined;
  alias?: string | undefined;
};

export type OptionsVariadic<T, S, O extends PropOptions<T, S>> =
  | []
  | [O]
  | [Transform<T | undefined, S>]
  | [Transform<T | undefined, S>, Omit<O, 'transformer'>];

export default function prop<T, S>(
  ...options: OptionsVariadic<T, S, PropOptions<T, S>>
): ModelProp<T, S> {
  if (options.length === 0) {
    return {};
  }

  if (options.length === 1) {
    if (typeof options[0] === 'function'
      || 'serialize' in options[0]
      || 'deserialize' in options[0]
    ) {
      return { transformer: options[0] };
    }

    return options[0];
  }

  const transformer = options[0];

  return {
    transformer,
    ...options[1],
  };
}
