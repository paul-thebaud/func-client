import { ModelInstance, ModelInstanceHook } from '@/core/model/types';
import wrap from '@/core/utilities/wrap';
import { Arrayable } from '@/core/utilities/types';

export default function runInstanceHooks(
  instance: ModelInstance<any>,
  hooks: Arrayable<ModelInstanceHook>,
) {
  wrap(hooks).forEach((hook) => {
    if (typeof instance[hook] === 'function') {
      instance[hook]();
    }
  });
}
