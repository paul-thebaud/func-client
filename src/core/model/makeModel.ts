import FuncModelError from '@/core/errors/funcModelError';
import compose from '@/core/model/compose';
import { Model, ModelConfig, ModelId, ModelInstance, ModelSchema, ModelValues } from '@/core/model/types';
import warn from '@/core/utilities/warn';

export default function makeModel<S extends ModelSchema<{}> = {}, E extends object = {}>(
  config: ModelConfig | string,
  schema?: S,
  extension?: E & ThisType<ModelInstance<S & E>>,
) {
  function ModelClass(this: ModelInstance) {
    this.id = undefined as unknown as ModelId;
    this.$exists = false;
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

        if (def.default && typeof def.default === 'object') {
          warn('default object values should be defined using a factory function');
        }
      }
    });
  }

  ModelClass.$config = typeof config === 'string' ? {
    type: config,
  } : config;
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
