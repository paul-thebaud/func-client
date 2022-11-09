import { ModelInstance, ModelSchema } from '@/core/model/types';

export default function makeComposable<S extends ModelSchema<{}>, E = {}>(
  schema?: S,
  extensions?: E & ThisType<ModelInstance<S & E>>,
) {
  return { schema, extensions };
}
