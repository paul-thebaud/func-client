import FuncClientError from '@/core/errors/funcClientError';
import isPropDef from '@/core/model/guards/isPropDef';
import { Model, ModelConfig, ModelInstance, ModelSchema } from '@/core/model/types';
import { Dictionary } from '@/core/utilities/types';
import warn from '@/core/utilities/warn';

export default function makeModelClass(config: ModelConfig): Model {
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
          warn('Default object values must be defined using a factory function');
        }
      }
    });
  }

  ModelClass.$MODEL_TYPE = 'model';
  ModelClass.$config = config;
  ModelClass.$schema = {} as Dictionary;
  ModelClass.$hooks = {};
  ModelClass.extends = (extendsFrom?: object) => {
    Object.entries(Object.getOwnPropertyDescriptors(extendsFrom ?? {}))
      .forEach(([key, descriptor]) => {
        if (['id', 'exists', 'type'].indexOf(key) !== -1) {
          throw new FuncClientError(
            `\`id\`, \`type\` and \`exists\` are forbidden as a definition keys (found \`${key}\`).`,
          );
        }

        if (descriptor.value && isPropDef(descriptor.value)) {
          ModelClass.$schema[key] = descriptor.value;
        } else {
          Object.defineProperty(ModelClass.prototype, key, descriptor);
        }
      });

    return ModelClass;
  };

  return ModelClass as unknown as Model;
}
