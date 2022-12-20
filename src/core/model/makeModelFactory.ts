import makeModelClass from '@/core/model/makeModelClass';
import { Model, ModelConfig, ModelInstance } from '@/core/model/types';

export default function makeModelFactory<ND extends {} = {}>(
  baseExtendsFrom?: ND & ThisType<ModelInstance<ND>>,
  baseConfig?: Omit<ModelConfig, 'type'>,
) {
  return <D extends {} = {}>(
    config: ModelConfig | string,
    extendsFrom?: D & ThisType<ModelInstance<ND & D>>,
  ) => {
    const mergedConfig = typeof config === 'string'
      ? { ...baseConfig, type: config }
      : { ...baseConfig, ...config };

    return makeModelClass(mergedConfig)
      .extends(baseExtendsFrom)
      .extends(extendsFrom) as Model<ND & D, ModelInstance<ND & D>>;
  };
}
