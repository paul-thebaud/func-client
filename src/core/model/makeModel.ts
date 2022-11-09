import FuncModelError from '@/core/errors/funcModelError';
import compose from '@/core/model/compose';
import { Model, ModelId, ModelInstance, ModelSchema, ModelValues } from '@/core/model/types';

// TODO Make model variation to allow function in class body.

export default function makeModel<S extends ModelSchema<{}> = {}, E extends object = {}>(
  type: string,
  schema?: S,
  extension?: E & ThisType<ModelInstance<S & E>>,
) {
  function ModelClass(this: ModelInstance) {
    this.id = undefined as unknown as ModelId;
    this.$original = {} as ModelValues<{}>;
    this.$values = {} as ModelValues<{}>;

    Object.entries(ModelClass.$schema).forEach(([key, def]) => {
      Object.defineProperty(this, key, {
        get: () => this.$values[key],
        set: (value) => {
          this.$values[key] = value;
        },
      });

      // TODO Handle object and array default.
      if (typeof def.default === 'function') {
        this.$values[key] = def.default();
      } else if (def.default !== undefined) {
        this.$values[key] = def.default;
      }
    });
  }

  ModelClass.$type = type;
  ModelClass.$schema = {} as ModelSchema<{}>;
  ModelClass.prototype = {};
  ModelClass.schema = (addSchema: object) => {
    compose(ModelClass.$schema, addSchema);

    return ModelClass;
  };
  ModelClass.extension = (addExtension: object) => {
    compose(ModelClass.prototype, addExtension);

    return ModelClass;
  };
  ModelClass.extend = (addSchemaAndExtension: { schema?: object; extension?: object; }) => {
    ModelClass.schema(addSchemaAndExtension.schema ?? {});
    ModelClass.extension(addSchemaAndExtension.extension ?? {});

    return ModelClass;
  };

  Object.defineProperty(ModelClass, '$rawSchema', {
    value: () => {
      throw new FuncModelError(
        '`Model.$rawSchema` cannot be used as it only holds generic raw schema of model',
      );
    },
  });

  if (schema) {
    ModelClass.schema(schema);
  }

  if (extension) {
    ModelClass.extension(extension);
  }

  return ModelClass as unknown as Model<S & E, ModelInstance<S & E>>;
}
