import FuncClientError from '@/core/errors/funcClientError';
import compose from '@/core/model/compose';
import { Model, ModelConfig, ModelInstance, ModelSchema } from '@/core/model/types';
import warn from '@/core/utilities/warn';

export default function makeModelClass(config: ModelConfig | string): Model {
  function ModelClass(this: ModelInstance) {
    Object.defineProperty(this, '$MODEL_TYPE', { value: 'instance' });
    Object.defineProperty(this, '$model', { value: ModelClass });
    Object.defineProperty(this, 'exists', { writable: true, value: false });
    Object.defineProperty(this, '$loaded', { writable: true, value: {} });
    Object.defineProperty(this, '$original', { writable: true, value: {} });
    Object.defineProperty(this, '$values', { writable: true, value: {} });

    Object.defineProperty(this, 'id', {
      writable: true,
      enumerable: true,
      value: undefined,
    });

    Object.entries(ModelClass.$schema as ModelSchema<any>).forEach(([key, def]) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        get: () => this.$values[key],
        set: (value) => {
          this.$values[key] = value;
        },
      });

      if (typeof def.default === 'function') {
        this.$values[key] = def.default();
      } else if (def.default !== undefined) {
        this.$values[key] = def.default;

        if (def.default && typeof def.default === 'object') {
          warn('default object values must be defined using a factory function');
        }
      }
    });
  }

  ModelClass.$MODEL_TYPE = 'model';
  ModelClass.$config = typeof config === 'string' ? {
    type: config,
  } : config;
  ModelClass.$schema = {} as ModelSchema;
  ModelClass.$hooks = {};
  ModelClass.prototype = {};
  ModelClass.schema = (addSchema?: object) => {
    if (addSchema) {
      compose(ModelClass.$schema, addSchema);
    }

    return ModelClass;
  };
  ModelClass.extension = (addExtension?: object) => {
    if (addExtension) {
      compose(ModelClass.prototype, addExtension);
    }

    return ModelClass;
  };
  ModelClass.extends = (addSchemaAndExtension?: { schema?: object; extension?: object; }) => {
    ModelClass.schema(addSchemaAndExtension?.schema);
    ModelClass.extension(addSchemaAndExtension?.extension);

    return ModelClass;
  };
  ModelClass.$rawSchema = () => {
    throw new FuncClientError(
      '`Model.$rawSchema` cannot be used as it only holds generic raw schema of model',
    );
  };

  return ModelClass as unknown as Model;
}
