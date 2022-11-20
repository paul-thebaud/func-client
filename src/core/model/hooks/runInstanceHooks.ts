import { ModelInstance, ModelInstanceHook } from '@/core/model/types';
import arrayWrap from '@/core/utilities/arrayWrap';
import { ArrayWrappable } from '@/core/utilities/types';

export default function runInstanceHooks(
  instance: ModelInstance<any>,
  hooks: ArrayWrappable<ModelInstanceHook>,
) {
  arrayWrap(hooks).forEach((hook) => {
    if (typeof instance[hook] === 'function') {
      instance[hook]();
    }
  });
}
