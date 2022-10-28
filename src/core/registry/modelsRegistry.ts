import MapRegistry from '@/core/registry/mapRegistry';
import { ModelClass } from '@/core/types/model';
import { Dictionary } from '@/core/types/utilities/dictionary';
import wrap from '@/core/utilities/wrap';

export default class ModelsRegistry extends MapRegistry<ModelClass> {
  public register(
    modelClasses: ModelClass[] | ModelClass,
  ): this {
    wrap(modelClasses).forEach(
      (m) => this.registerOneSync(m.make({}, { noInit: true }).type, m),
    );

    return this;
  }

  public registerAsync(
    modelClasses: Dictionary<() => Promise<ModelClass>>,
  ): this {
    Object.entries(modelClasses).forEach(
      ([k, r]) => this.registerOneAsync(k, r),
    );

    return this;
  }
}
