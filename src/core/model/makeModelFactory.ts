import makeModelClass from '@/core/model/makeModelClass';
import { Model, ModelConfig, ModelInstance } from '@/core/model/types';

export default function makeModelFactory<ND extends {} = {}>(
  baseExtendsFrom?: ND & ThisType<ModelInstance<ND>>,
) {
  return <D extends {} = {}>(
    config: ModelConfig | string,
    extendsFrom?: D & ThisType<ModelInstance<ND & D>>,
  ) => makeModelClass(config)
    .extends(baseExtendsFrom)
    .extends(extendsFrom) as Model<ND & D, ModelInstance<ND & D>>;
}
