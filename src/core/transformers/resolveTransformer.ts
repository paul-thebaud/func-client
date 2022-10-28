import { Transformer, TransformersRegistry } from '@/core/transformers/transformer';

function resolveTransformerIdAndParams(cast: string) {
  const [castId, paramsString] = cast.split(':');
  if (!paramsString) {
    return [castId];
  }

  return [castId, ...paramsString.split(',')];
}

export default async function resolveTransformer(
  registry: TransformersRegistry,
  transformer: Transformer | string,
) {
  if (typeof transformer === 'string') {
    const [id, ...params] = resolveTransformerIdAndParams(transformer);

    return {
      transformer: await registry.get(id),
      params,
    };
  }

  return {
    transformer,
    params: [],
  };
}
