import FuncModelError from '@/core/errors/funcModelError';
import { Model, ModelId, ModelInstance, ModelSchema, ModelValues } from '@/core/model/types';

export default function makeModel<S extends ModelSchema<{}>, E = {}>(
  type: string,
  schema: S,
  extensions?: E & ThisType<ModelInstance<S & E>>,
) {
  function ModelClass(this: ModelInstance<S>) {
    this.id = null as unknown as ModelId;
    this.$original = {} as ModelValues<S>;
    this.$values = {} as ModelValues<S>;

    Object.keys(schema).forEach((key: keyof ModelValues<S>) => {
      Object.defineProperty(this, key, {
        get: () => this.$values[key],
        set: (value: ModelValues<S>[typeof key]) => {
          this.$values[key] = value;
        },
      });
    });
  }

  ModelClass.prototype = extensions || {};
  ModelClass.$type = type;
  ModelClass.$schema = schema;

  Object.defineProperty(ModelClass, '$rawSchema', {
    get() {
      throw new FuncModelError('`$rawSchema` cannot be used as it only holds generic raw schema of model');
    },
  });

  return ModelClass as unknown as Model<S & E>;
}
