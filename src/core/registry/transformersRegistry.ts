import MapRegistry from '@/core/registry/mapRegistry';
import { Transformer } from '@/core/transformers/transformer';
import { Dictionary } from '@/core/types/utilities/dictionary';
import wrap from '@/core/utilities/wrap';

type IdentifiableTransformer = Transformer & { id: string };

export default class TransformersRegistry extends MapRegistry<Transformer> {
  public register(
    transformers: IdentifiableTransformer[] | IdentifiableTransformer,
  ): this {
    wrap(transformers).forEach(
      (t) => this.registerOneSync(t.id, t),
    );

    return this;
  }

  public registerAsync(
    transformers: Dictionary<() => Promise<Transformer>>,
  ): this {
    Object.entries(transformers).forEach(
      ([k, r]) => this.registerOneAsync(k, r),
    );

    return this;
  }
}
