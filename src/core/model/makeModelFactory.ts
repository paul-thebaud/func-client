import makeModelClass from '@/core/model/makeModelClass';
import { Model, ModelConfig, ModelInstance, ModelSchema } from '@/core/model/types';

export default function makeModelFactory<BS extends ModelSchema<{}> = {}, BE extends object = {}>(
  baseSchema?: BS,
  baseExtension?: BE & ThisType<ModelInstance<BS & BE>>,
) {
  return <S extends ModelSchema<{}> = {}, E extends object = {}>(
    config: ModelConfig | string,
    schema?: S,
    extension?: E & ThisType<ModelInstance<BS & BE & S & E>>,
  ) => makeModelClass(config)
    .schema(baseSchema)
    .schema(schema)
    .extension(baseExtension)
    .extension(extension) as Model<BS & BE & S & E, ModelInstance<BS & BE & S & E>>;
}
