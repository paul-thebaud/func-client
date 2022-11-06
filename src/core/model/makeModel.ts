import FuncModelError from '@/core/errors/funcModelError';
import { Model, ModelId, ModelInstance, ModelSchema, ModelValues } from '@/core/model/types';

export default function makeModel<S extends ModelSchema<{}>, E = {}>(
  type: string,
  schema?: S,
  extensions?: E & ThisType<ModelInstance<S & E>>,
) {
  function ModelClass(this: ModelInstance<S>) {
    this.id = undefined as unknown as ModelId;
    this.$original = {} as ModelValues<S>;
    this.$values = {} as ModelValues<S>;

    Object.entries(schema || {}).forEach(([key, def]) => {
      Object.defineProperty(this, key, {
        get: () => this.$values[key],
        set: (value: ModelValues<S>[typeof key]) => {
          this.$values[key as keyof ModelValues<S>] = value;
        },
      });

      // TODO Handle object and array default.
      if (typeof def.default === 'function') {
        this.$values[key as keyof ModelValues<S>] = def.default();
      } else if (def.default !== undefined) {
        this.$values[key as keyof ModelValues<S>] = def.default;
      }
    });
  }

  ModelClass.prototype = extensions || {};
  ModelClass.$type = type;
  ModelClass.$schema = schema || {};

  Object.defineProperty(ModelClass, '$rawSchema', {
    value: () => {
      throw new FuncModelError(
        '`Model.$rawSchema` cannot be used as it only holds generic raw schema of model',
      );
    },
  });

  return ModelClass as unknown as Model<S & E>;
}
