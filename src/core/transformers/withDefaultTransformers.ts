import { BooleanTransformer, DateTransformer, NumberTransformer, StringTransformer } from '@/core';
import TransformersRegistry from '@/core/registry/transformersRegistry';

export default function withDefaultTransformers<T extends TransformersRegistry>(
  transformersRegistry: T,
): T {
  return transformersRegistry.register([
    new BooleanTransformer(),
    new DateTransformer(),
    new NumberTransformer(),
    new StringTransformer(),
  ]);
}
