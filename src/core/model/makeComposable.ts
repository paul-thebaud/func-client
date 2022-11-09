import { ModelInstance, ModelSchema } from '@/core/model/types';

export default function makeComposable<S extends ModelSchema<{}> = {}, E extends object = {}>(
  schema?: S,
  extension?: E & ThisType<ModelInstance<S & E>>,
) {
  return {
    schema: schema ?? {},
    extension: extension ?? {},
  } as { schema: S; extension: E; };
}
